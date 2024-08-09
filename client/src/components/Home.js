import React from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <div class="title-page-container">
            <div class="title-page">
                <h1>The Song of Books and Readers</h1>
                <h3>Keep all your book notes in one place</h3>
            </div>
            <div class="title-buttons">
                <button type="submit" onClick={() => navigate("/register")}>Sign Up</button>
                <button type="submit" onClick={() => navigate("/login")}>Login</button>
            </div>
        </div>
    );
}

export default Home;