import React from "react";
import BookEntry from "./BookEntry";

function Books(props) {
    return (
        <div>
            <h1>Books</h1>
            <div class="book-entry-container">
                {props.books.map(book => <BookEntry book={book}/>)}
            </div>
        </div>
    );
}

export default Books;