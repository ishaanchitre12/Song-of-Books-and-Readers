import React, {useState} from "react";

function InProgressNote(props) {
    const [newNote, setNewNote] = useState({
        id: props.note ? props.note.id : "",
        noteDate: props.note ? props.note.note_date.substr(0, 10) : "",
        notes: props.note ? props.note.notes : ""
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setNewNote(prevNote => {
            return {...prevNote, [name]: value};
        });
    }

    return (
        <form className="notes-form">
            <label for="noteDate">Date:</label>
            <input type="date" name="noteDate" onChange={handleChange} value={newNote.noteDate} required/>
            <label for="notes">Notes:</label>
            <textarea name="notes" wrap="soft" rows="30" onChange={handleChange} value={newNote.notes} required></textarea>
            <button onClick={(e) => {
                props.handleSubmit(newNote)
                e.preventDefault();
            }}>
                Submit
            </button>
        </form>
    )
}

export default InProgressNote;