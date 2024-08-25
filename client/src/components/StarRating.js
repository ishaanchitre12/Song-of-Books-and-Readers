import React, {useState, useEffect} from "react";

function StarRating(props) {
    const [stars, setStars] = useState([]);

    function getStars() {
        console.log("Rating: " + props.rating);
        for (let i = 2; i <= props.rating; i+=2) {
            setStars(prevStars => [...prevStars, <span className="material-icons star">star</span>])
        }
        if (props.rating % 2 !== 0) {
            setStars(prevStars => [...prevStars, <span className="material-icons star">star_half</span>])
        }
    }

    useEffect(() => {
        getStars();
    }, []);

    return (
        <>
            {stars}
        </>
    )
}

export default StarRating;