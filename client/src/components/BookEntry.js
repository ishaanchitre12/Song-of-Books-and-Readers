import React, {useState, useEffect} from "react";
import axios from "axios";
import StarRating from "./StarRating";

function BookEntry(props) {
    const SERVER_URL = "http://localhost:4000/books";
    const config = {
        headers: {token: localStorage.token}
    };
    const [review, setReview] = useState(null);

    async function getReview() {
        try {
            const response = await axios.get(`${SERVER_URL}/review/${props.book.id}`, config);
            if (response.data.length > 0) {
                setReview(response.data[0]);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getReview();
    }, []);

    return (
        <div class="book-entry">
            <img class="book-cover-image" src={props.book.imagelink}/>
            <h3 class="book-title">{props.book.title} {review && <StarRating rating={review.rating}/>}</h3>
            <h4 class="book-author">{props.book.author}</h4>
            <p class="book-description">{props.book.description}</p>
        </div>
    );
}

export default BookEntry;