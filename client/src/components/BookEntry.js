import React from "react";

function BookEntry(props) {
    return (
        <div class="book-entry">
            <img class="book-cover-image" src={props.book.imagelink}/>
            <h3 class="book-title">{props.book.title}</h3>
            <h4 class="book-author">{props.book.author}</h4>
            <p class="book-description">{props.book.description}</p>
        </div>
    );
}

export default BookEntry;