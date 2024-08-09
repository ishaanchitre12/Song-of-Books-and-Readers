import React from "react";
import {useParams} from "react-router-dom"

function NewNote() {
    const {id} = useParams();
    return (
        <h1>New Note {id}</h1>
    )
}

export default NewNote;