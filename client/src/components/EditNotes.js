import React from "react";
import {useParams} from "react-router-dom"

function EditNotes() {
    const {id} = useParams();
    return (
        <h1>Edit Notes {id}</h1>
    )
}

export default EditNotes;