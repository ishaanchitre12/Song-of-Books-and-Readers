import React from "react";

function InProgressReview() {
    return (
        <form class="finished-attributes">
            <div class="finished-checkbox">
                <label for="finished">Finished?</label>
                <input type="checkbox" id="checkbox" name="finished" value="Finished"/>
            </div>
            <div class="rating">
                <label id="rating-label" for="rating" hidden>Rating:</label>
                <input id="rating-input" type="number" name="rating" min="1" max="10"/>
            </div>
            <div class="date-finished">
                <label id="date-finished-label" for="dateFinished" hidden>Date Finished:</label>
                <input id="date-finished-input" type="date" name="dateFinished"/>
            </div>
        </form>
    )
}

export default InProgressReview;