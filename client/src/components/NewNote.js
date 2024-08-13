import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import InProgressReview from "./InProgressReview";

function NewNote() {
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

    async function getReview() {
        try {
            const response = await axios.get(`${SERVER_URL}review/${id}`, config);
            if (response.data.length > 0) {
                setReview(response.data[0]);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getBook();
        getReview();
    }, []);

    return (
        <>
            <h1>Add Your Notes</h1>
            <img src={book.imagelink}></img>
            {!review && <InProgressReview/>}
            <form className="book-notes-container">
                <label for="noteDate">Date:</label>
                <input type="date" name="noteDate" required/>
                <label for="notes">Notes:</label>
                <textarea name="notes" wrap="soft" rows="30" required></textarea>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default NewNote;