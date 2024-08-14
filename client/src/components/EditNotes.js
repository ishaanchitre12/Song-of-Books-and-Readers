import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import FinishedReview from "./FinishedReview";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import FinishedNote from "./FinishedNote";
import InProgressNote from "./InProgressNote";
import CancelButton from "./buttons/CancelButton";

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

    function edit(id) {
        setInProgressNotes(prevNotes => [...prevNotes, id]);
    }

    function clear(id) {
        setInProgressNotes(prevNotes => {
            return prevNotes.filter(note => note !== id);
        });
    }

    async function submitNote(note) {
        try {
            const response = await axios.patch(`${SERVER_URL}/edit/${id}`, note, config);
            clear(note.id);
            setNotes(prevNotes => {
                return prevNotes.filter(n => n.id !== note.id);
            });
            setNotes(prevNotes => [...prevNotes, response.data[0]]);
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
                   <FinishedReview review={review}/> 
                   <div class="empty-div"></div>
                   <EditButton/>
                   <DeleteButton/>
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
                        <CancelButton id={note.id} handleClick={clear}/> :
                        <EditButton id={note.id} handleClick={edit}/> 
                    }
                    <DeleteButton />
                </div>
            ))}
            
        </>
    )
}

export default EditNotes;