import "./LoginSection.css"
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"

const LoginSection = () => {

  // const [username, setUsername] = useState<string>("")
  // const [isLoggeIn, setIsLoggedIn] = useState<boolean>(false)

  const {username, setUsername, isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  


  const handleLogin = () => {
    console.log(username)
    setIsLoggedIn(true)
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
            onClick={() => handleLogin()}>
            Login
          </button>
        </>}



    </div>
  )
}

export default LoginSection