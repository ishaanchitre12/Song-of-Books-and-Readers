import React from "react";

function DeleteButton(props) {
    return (
        <button className="icon" onClick={() => props.handleClick(props.id)}>
            <span className="material-icons">delete</span>
        </button>
    );
}

export default DeleteButton;