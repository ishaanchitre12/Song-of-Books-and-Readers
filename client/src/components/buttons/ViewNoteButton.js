import React from "react";
import {useNavigate} from "react-router-dom";

function ViewNotesButton(props) {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(`/books/view-notes/${props.bookId}`)}>View Notes</button>
    )
}

export default ViewNotesButton;