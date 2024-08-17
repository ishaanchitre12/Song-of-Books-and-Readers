import React, {useState, useEffect} from "react";

function InProgressReview(props) {
    const [checked, setChecked] = useState(false);
    const [review, setReview] = useState({
        dateFinished: props.review ? props.review.date_finished.substr(0, 10) : "",
        rating: props.review ? props.review.rating : ""
    });

    function handleCheck() {
        setChecked(prevValue => !prevValue);
    }

    function handleTextChange(event) {
        const {name, value} = event.target;
        setReview(prevReview => {
            return {...prevReview, [name]: value};
        });
    }

    useEffect(() => {
        if (props.submit) {
            props.handleSubmit({finished: checked, ...review});
        }
    })

    return (
        <form class="finished-attributes" onSubmit={(e) => {
            e.preventDefault();
            props.handleSubmit({finished: checked, ...review});
        }}>
            <div class="finished-checkbox">
                <label for="finished">Finished?</label>
                <input type="checkbox" id="checkbox" name="finished" value="Finished" onChange={handleCheck} />
            </div>
            {checked && 
            <>
                <div class="rating">
                    <label id="rating-label" for="rating" hidden>Rating:</label>
                    <input id="rating-input" type="number" name="rating" min="1" max="10" onChange={handleTextChange} value={review.rating}/>
                </div>
                <div class="date-finished">
                    <label id="date-finished-label" for="dateFinished" hidden>Date Finished:</label>
                    <input id="date-finished-input" type="date" name="dateFinished" onChange={handleTextChange} value={review.dateFinished}/>
                </div>
            </>
            }
            {props.review && <button type="submit">Submit</button>}
        </form>
    )
}

export default InProgressReview;