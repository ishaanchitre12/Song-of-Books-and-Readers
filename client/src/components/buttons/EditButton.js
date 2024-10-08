import React from "react";

function EditButton(props) {
    return (
        <button className="icon" onClick={() => props.handleClick(props.id)}>
            <span className="material-icons">edit</span>
        </button>
    );
}

export default EditButton;