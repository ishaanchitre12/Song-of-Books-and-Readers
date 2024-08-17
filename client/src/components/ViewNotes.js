import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom"
import axios from "axios";
import FinishedReview from "./FinishedReview";
import FinishedNote from "./FinishedNote";

function ViewNotes() {
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

    useEffect(() => {
        getBook();
        getNotes();
        getReview();
    }, []);

    return (
        <>
            <h1>{book.title}</h1>
            <h2>By: {book.author}</h2>
            <img className="book-cover-image" src={book.imagelink}/>
            {review && <div className="view-notes"><FinishedReview review={review}/></div>}
            {notes.map(note => <div className="view-notes"><FinishedNote note={note}/></div>)}
        </>
    )
}

export default ViewNotes;