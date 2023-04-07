import React, { useState, useRef } from 'react';
import axios from "axios";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Login() {

  let usernameRef = useRef("")
  let passwordRef = useRef("")

  let [result, setResult] = useState("")

  async function submitHandler(e) {
    e.preventDefault()
    const username = usernameRef.current.value
    const password = passwordRef.current.value
    const response = await axios.post('http://127.0.0.1:8000/api/token/', {
      username,
      password
    })
    const token = response.data.access
    setResult(`Your access token is ${token}`)
    // 在这里可以将token存储到本地存储中，以便在其他页面中使用
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <label>
          Username:
          <input type="text" ref={usernameRef} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" ref={passwordRef} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{result}</p>
    </div>
  );
}

export default Login;
