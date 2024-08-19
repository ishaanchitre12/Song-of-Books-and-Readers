import React, {useState, useEffect} from "react";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Books from "./Books";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import NewNote from "./NewNote";
import ViewNotes from "./ViewNotes";
import EditNotes from "./EditNotes";
import NewBook from "./NewBook";

function App() {
  const SERVER_URL = "http://localhost:4000/";
  const [isAuthenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  async function isAuth() {
    try {
      const response = await axios.get(SERVER_URL + "auth/verify/", {
        headers: {
          token: localStorage.token
        }
      });
      console.log(response);
      response.data === true ? setAuthenticated(true) : setAuthenticated(false);
    } catch (err) {
      console.error(err);
    }
  }

  function checkAuth(boolean) {
    setAuthenticated(boolean);
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={!isAuthenticated ? <Login checkAuth={checkAuth}/> : <Navigate to="/books"/>}/>
        <Route path="/register" element={!isAuthenticated ? <Register checkAuth={checkAuth}/> : <Navigate to="/login"/>}/>
        <Route path="/books">
          <Route index element={isAuthenticated ? <Books checkAuth={checkAuth}/> : <Navigate to="/login"/>}/>
          <Route path="new" element={isAuthenticated ? <NewBook /> : <Navigate to="/login"/>}/>
          <Route path="add-note/:id" element={isAuthenticated ? <NewNote /> : <Navigate to="/login"/>}/>
          <Route path="view-notes/:id" element={isAuthenticated ? <ViewNotes /> : <Navigate to="/login"/>}/>
          <Route path="edit-notes/:id" element={isAuthenticated ? <EditNotes /> : <Navigate to="/login"/>}/>
        </Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
