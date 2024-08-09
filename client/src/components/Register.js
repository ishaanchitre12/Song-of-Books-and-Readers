import React, {useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function Register(props) {
    const SERVER_URL = "http://localhost:4000/auth/register/";
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setUser(prevUser => {
            return {...prevUser, [name]: value}
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post(SERVER_URL, user).catch((err) => {
                setUser({email: "", password: ""});
                toast.error(err.response.data);
            });
            if (response) {
                localStorage.setItem("token", response.data.token);
                props.checkAuth(true);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div class="register-page-container">
            <h1 id="register-page-title">Sign Up</h1>
            <form class="register-page" onSubmit={handleSubmit}>
                <div class="email-container">
                    <label for="email">Email:</label>
                    <input type="text" name="email" onChange={handleChange} value={user.email} autocomplete="off"/>
                </div>
                <div class="password-container">
                    <label for="password">Password:</label>
                    <input type="password" name="password" onChange={handleChange} value={user.password}/>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <ToastContainer/>
        </div>
    )

}

export default Register;