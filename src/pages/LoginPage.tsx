import "./LoginPage.css";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { User } from "../types/User";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const { setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate();


  const signin = async (_username: string) => {
    const url = "http://localhost:8000";

    const isUserValid: User | undefined = await axios
      .get(`${url}/users/${username}`)
      .then(function (response) {
        const data: User = response.data;

        return data;
      })
      .catch(function (error) {
        alert("error")
        return undefined;
      });

    return isUserValid;
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(username);
    const isUserValid = await signin(username)

    if (isUserValid) {
      navigate("/chat", { state: { username: username } });
      setIsLoggedIn(true);
    } else {
      alert("Username was not created. Create one on sign up page.")
    }

  };

  return (
    <div className="login-page-container">
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="login-input"
          placeholder="Type username to join chat"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
      <span>
        Didn't create username? <Link to="/signup">Create Username</Link>
      </span>
    </div>
  );
};

export default LoginPage;
