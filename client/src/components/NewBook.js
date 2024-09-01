import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function NewBook() {
    const [title, setTitle] = useState("");
    const [possibleBooks, setPossibleBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    // {
    //     id: "",
    //     title: "",
    //     author: "",
    //     description: "",
    //     imageLink: ""
    // }
    const GOOGLE_API_URL = "https://www.googleapis.com/books/v1/volumes";
    const SERVER_URL = "http://localhost:4000/books/";
    const config = {
        headers: {token: localStorage.token}
    };
    const navigate = useNavigate();

    function handleChange(event) {
        setTitle(event.target.value);
    }

    async function search(event) {
        event.preventDefault();
        try {
            const googleResponse = await axios.get(GOOGLE_API_URL + "?q=" + encodeURI(title));
            const data = googleResponse.data.items;
            for (let i = 0; i < 5; i++) {
                const book = data[i];
                const {title, authors, description, imageLinks} = book.volumeInfo;
                const newBook = {
                    id: book.id,
                    title: title,
                    author: authors[0],
                    description: description,
                    imageLink: imageLinks.thumbnail
                }
                setPossibleBooks(prevBooks => [...prevBooks, newBook]);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    async function select(book) {
        try {
            const response = await axios.post(SERVER_URL, book, config);
            navigate("/books");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <h1>New Book</h1>
            <form onSubmit={search}>
                <label for="newBook">Enter the title of the book:</label>
                <input type="text" name="newBook" autoComplete="off" onChange={handleChange} value={title} required/>
                <button type="submit">Search</button>
            </form>
            {possibleBooks.map(book => (
                <button key={book.id} className="book-cover-button" onClick={() => setSelectedBook(book)}>
                    <img src={book.imageLink}></img>
                </button>
            ))}
            {selectedBook && 
                <>
                    <h2 className="title">{selectedBook.title}</h2>
                    <h3 className="author">By: {selectedBook.author}</h3>
                    <p className="description">{selectedBook.description}</p>
                    <button onClick={() => select(selectedBook)}>Select</button>
                </>
            }
        </>
    );
}

export default NewBook;