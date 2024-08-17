import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import FinishedReview from "./FinishedReview";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import FinishedNote from "./FinishedNote";
import InProgressNote from "./InProgressNote";
import CancelButton from "./buttons/CancelButton";
import InProgressReview from "./InProgressReview";

function EditNotes() {
    const SERVER_URL = "http://localhost:4000/books/";
    const config = {
        headers: {token: localStorage.token}
    };
    const {id} = useParams();
    const [book, setBook] = useState({
        id: "",
        title: "",
        author: "",
        description: "",
        imagelink: "",
        user_id: ""
    });
    const [notes, setNotes] = useState([]);
    const [review, setReview] = useState(null);
    const [inProgressNotes, setInProgressNotes] = useState([]);
    const [inProgressReview, setInProgressReview] = useState(false);

    async function getBook() {
        try {
            const response = await axios.get(SERVER_URL + id, config);
            console.log(response);
            setBook(response.data[0]);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function getNotes() {
        try {
            const response = await axios.get(`${SERVER_URL}/edit/${id}`, config);
            console.log(response);
            setNotes(response.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function getReview() {
        try {
            const response = await axios.get(`${SERVER_URL}review/${id}`, config);
            console.log(response);
            if (response.data.length > 0) {
                setReview(response.data[0]);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    function editNote(id) {
        setInProgressNotes(prevNotes => [...prevNotes, id]);
    }

    function editReview(id) {
        setInProgressReview(true);
    }

    function clearNote(id) {
        setInProgressNotes(prevNotes => {
            return prevNotes.filter(note => note !== id);
        });
    }

    function clearReview(id) {
        setInProgressReview(false);
    }

    async function submitNote(newNote) {
        try {
            const response = await axios.patch(`${SERVER_URL}/edit/${id}`, newNote, config);
            clearNote(newNote.id);
            setNotes(prevNotes => {
                return prevNotes.filter(n => n.id !== newNote.id);
            });
            setNotes(prevNotes => [...prevNotes, response.data[0]]);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function submitReview(newReview) {
        try {
            if (newReview.finished) {
                const response = await axios.patch(`${SERVER_URL}/review/${id}`, newReview, config);
                clearReview();
                setReview(response.data[0]);
            } else {
                deleteReview();
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    async function deleteNote(noteId) {
        try {
            const response = await axios.delete(`${SERVER_URL}/edit/${noteId}`, config);
            clearNote(noteId);
            setNotes(prevNotes => {
                return prevNotes.filter(n => n.id !== noteId);
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    async function deleteReview(reviewId) {
        try {
            const response = await axios.delete(`${SERVER_URL}/review/${id}`, config);
            clearReview();
            setReview(null);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getBook();
        getNotes();
        getReview();
    }, []);

    return (
        <>
            <h1>Edit Notes</h1>
            <img className="book-cover-image" src={book.imagelink}/>
            {review && 
            <div className="edit-container">
                {inProgressReview ? <InProgressReview review={review} handleSubmit={submitReview}/> : <FinishedReview review={review}/>}
                <div class="empty-div"></div>
                {inProgressReview ? <CancelButton handleClick={clearReview}/> : <EditButton handleClick={editReview}/>}
                <DeleteButton handleClick={deleteReview}/>
            </div>
                
                
            }
            {notes.map(note => (
                <div className="edit-container clear-img">
                    {console.log(inProgressNotes)}
                    {inProgressNotes.includes(note.id) ? 
                        <div className="book-notes-container">
                            <InProgressNote note={note} handleSubmit={submitNote}/>
                        </div> : 
                        <FinishedNote key={note.id} note={note}/>
                    }
                    <div class="empty-div"></div>
                    {inProgressNotes.includes(note.id) ? 
                        <CancelButton id={note.id} handleClick={clearNote}/> :
                        <EditButton id={note.id} handleClick={editNote}/> 
                    }
                    <DeleteButton id={note.id} handleClick={deleteNote}/>
                </div>
            ))}
            
        </>
    )
}

export default EditNotes;