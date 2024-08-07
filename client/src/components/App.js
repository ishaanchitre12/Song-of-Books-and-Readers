import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import axios from "axios";
import Books from "./Books";

function App() {
  const SERVER_URL = "http://localhost:4000/";
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    try {
      const response = await axios.get(SERVER_URL);
      console.log(response);
      setBooks(response.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Books books={books}/>}/>
      </Routes>
    </div>
  );
}

export default App;
