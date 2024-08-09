import React from "react";
import {useParams} from "react-router-dom"

function ViewNotes() {
    const {id} = useParams();
    return (
        <h1>View Notes {id}</h1>
    )
}

export default ViewNotes;