import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./SignUpPage.css";

import { User } from "../types/User";
import { urls } from "../constants";

const SignUpPage = () => {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate()

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.trim() === "") {
      alert("Error: Empty Username")
      return
    }

    const user = await createUser(username);
    if (!user) {
      alert("Error creating user. The Username might be already taken");
      return;
    }

    setUsername(user.name);
    navigate("/signin")
    alert("Successfully created username")
  };

  const createUser = async (_username: string) => {
    const url = urls.httpLocalhost;

    const user: User | undefined = await axios
      .post(`${url}/users/`, {
        name: _username,
      })
      .then(function (response) {
        const data: User = response.data;

        return data;
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
        return undefined;
      });

    console.log(user);

    return user;
  };

  return (
    <div className="signup-page-container">
      <form className="signup-form" onSubmit={handleSignUp}>
        <input
          className="signup-input"
          placeholder="Type username to create"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="signup-button" type="submit">
          Sign Up
        </button>
      </form>
      <span>
        Already created username? <Link to="/signin">Sign In</Link>
      </span>
    </div>
  );
};

export default SignUpPage;
