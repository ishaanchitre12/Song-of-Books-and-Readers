import React from "react";

function CancelButton(props) {
    return (
        <button className="icon" onClick={() => props.handleClick(props.id)}>
            <span className="material-icons">cancel</span>
        </button>
    )
}

export default CancelButton;