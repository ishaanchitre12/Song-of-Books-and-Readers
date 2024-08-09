import React from "react";
import {useNavigate} from "react-router-dom";

function AddNoteButton(props) {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(`/books/add-note/${props.bookId}`)}>Add Note</button>
    )
}

export default AddNoteButton;