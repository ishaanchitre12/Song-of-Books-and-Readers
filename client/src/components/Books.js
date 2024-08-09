import React, {useState, useEffect} from "react";
import BookEntry from "./BookEntry";
import axios from "axios";

function Books(props) {
    const SERVER_URL = "http://localhost:4000/books/";
    const [books, setBooks] = useState([]);

    async function getBooks() {
        try {
          const response = await axios.get(SERVER_URL, {
            headers: {token: localStorage.token}
          });
          console.log(response);
          setBooks(response.data);
        } catch (err) {
          console.error(err.message);
        }
    }

    function logout(event) {
        event.preventDefault();
        localStorage.removeItem("token");
        props.checkAuth(false);
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div>
            <div class="books-header">
                <h1>Book Notes</h1>
                <button onClick={(event) => logout(event)}>Logout</button>
            </div>
            <div class="book-entry-container">
                {books.map(book => <BookEntry book={book}/>)}
            </div>
        </div>
    );
}

export default Books;