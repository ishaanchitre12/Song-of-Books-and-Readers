import React, {useState, useEffect} from "react";
import AddNoteButton from "./buttons/AddNoteButton";
import DeleteBookButton from "./buttons/DeleteBookButton";
import EditNotesButton from "./buttons/EditNotesButton";
import ViewNotesButton from "./buttons/ViewNoteButton";
import axios from "axios";

function ButtonBar(props) {
    const SERVER_URL = "http://localhost:4000/books/edit/";
    const config = {
        headers: {token: localStorage.token}
    };
    const [buttons, setButtons] = useState([<AddNoteButton bookId={props.bookId}/>, <DeleteBookButton bookId={props.bookId}/>]);

    async function getNotes() {
        try {
            await axios.get(SERVER_URL + props.bookId, config).then((res) => {
                if (res.data.length > 0) {
                    setButtons(prevButtons => [prevButtons[0], <ViewNotesButton bookId={props.bookId}/>, <EditNotesButton bookId={props.bookId}/>, prevButtons[1]])
                }
            }).catch((err) => {
                console.log(err);
            });
            
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <div className="home-page-buttons">
            {buttons}
        </div>
    )
}

export default ButtonBar;