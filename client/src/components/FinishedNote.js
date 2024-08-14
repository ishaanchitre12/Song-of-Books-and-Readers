import React from "react";

function FinishedNote(props) {
    return (
        <div className="edit-notes-attributes">
            <p>{props.note.note_date.substr(0, 10)}</p>
            <p>{props.note.notes}</p>
        </div>
    );
}

export default FinishedNote;