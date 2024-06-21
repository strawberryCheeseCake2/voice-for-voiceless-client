import "./LoginSection.css"
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"

const LoginSection = () => {

  // const [username, setUsername] = useState<string>("")
  // const [isLoggeIn, setIsLoggedIn] = useState<boolean>(false)

  const {username, setUsername, isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  const [userId, setUserId] = useState<number>(-1);
  

  const createUsername = async () => {
    const userId = await createUser(username)

    if (!userId) {
      alert("Error getting UserId")
      return
    } 
    
    setUserId(userId)
    setIsLoggedIn(true)
  }

  const createUser = async (_username: string) => {
    const url = "http://localhost:8000"

    const userId: number | undefined = await axios.post(`${url}/users/`, {
      name: _username,
    })
    .then(function (response) {
      
      return response.data.id
    })
    .catch(function (error) {
      console.log(error);
    });

    console.log(userId)
    
    return userId
  }

  return (
    <div className='login-container'>
      {isLoggedIn ?
        <p>Logged in as: {username}</p>
        :
        <>
          <input
            className="login-input"
            placeholder="Type username to join"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="login-button"
            onClick={() => createUsername()}>
            Login
          </button>
        </>}



    </div>
  )
}

export default LoginSection