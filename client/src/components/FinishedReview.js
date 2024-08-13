import React from "react";

function FinishedReview(props) {
    return (
        <div class="edit-reviews-attributes">
            <p>Finished on: {props.review.dateFinished}</p>
            <p>Rating: {props.review.rating}</p>
        </div>
    );
}

export default FinishedReview;