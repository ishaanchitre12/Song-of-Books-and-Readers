import React from "react";
import {useNavigate} from "react-router-dom";

function DeleteBookButton(props) {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(`/books/delete-book/${props.bookId}`)}>Delete Book</button>
    )
}

export default DeleteBookButton;