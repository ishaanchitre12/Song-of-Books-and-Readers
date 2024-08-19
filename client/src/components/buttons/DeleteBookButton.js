import React from "react";
import axios from "axios";

function DeleteBookButton(props) {
    const SERVER_URL = "http://localhost:4000/books";
    const config = {
        headers: {token: localStorage.token}
    };

    async function deleteBook() {
        try {
            const response = await axios.delete(`${SERVER_URL}/${props.bookId}`, config);
            props.onClick();
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <button onClick={deleteBook}>Delete Book</button>
    )
}

export default DeleteBookButton;