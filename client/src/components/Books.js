import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import BookEntry from "./BookEntry";
import ButtonBar from "./ButtonBar";
import axios from "axios";

function Books(props) {
    const SERVER_URL = "http://localhost:4000/books/";
    const config = {
        headers: {token: localStorage.token}
    }
    const [books, setBooks] = useState([]);
    const [sorting, setSorting] = useState("");
    const navigate = useNavigate();

    async function getBooks() {
        try {
          const response = await axios.get(SERVER_URL, config);
          console.log(response);
          setBooks(response.data);
        } catch (err) {
          console.error(err.message);
        }
    }

    function handleSelect(event) {
        setSorting(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            if (sorting === "rating") {
                const response = await axios.get(`${SERVER_URL}sort-by/rating`, config);
                console.log(response.data);
                setBooks(response.data);
            } else if (sorting === "date_finished") {
                const response = await axios.get(`${SERVER_URL}sort-by/date-finished`, config);
                setBooks(response.data);
            } else if (sorting === "title") {
                const response = await axios.get(`${SERVER_URL}sort-by/title`, config);
                setBooks(response.data);
            }
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
                <h1>Book Gallery</h1>
                <button onClick={(event) => logout(event)}>Logout</button>
            </div>
            <form onSubmit={handleSubmit}>
                <label for="sorting">Sort by:</label>
                <select name="sorting" className="drop-down" onChange={handleSelect}>
                    <option style={{display: "none"}}></option>
                    <option value="title">Title</option>
                    <option value="date_finished">Date Finished</option>
                    <option value="rating">Rating</option>
                </select>
                <button type="submit">Go</button>
            </form>
            <div class="book-entry-container">
                {books.map(book => (
                    <>
                        <BookEntry key={book.id} book={book}/>
                        <ButtonBar key={book.id * 1000} bookId={book.id} rerender={getBooks}/>
                    </>
                ))}
            </div>
            <button onClick={() => navigate("/books/new")}>Add Book</button>
        </div>
    );
}

export default Books;