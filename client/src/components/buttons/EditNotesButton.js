import React from "react";
import {useNavigate} from "react-router-dom";

function EditNotesButton(props) {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(`/books/edit-notes/${props.bookId}`)}>Edit Notes</button>
    )
}

export default EditNotesButton;