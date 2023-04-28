import React, { useState, useRef } from 'react';
import axios from "axios";
import './App.js';
import './App.css';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Login(props) {
  const { result, setResult, setToken } = props;

  let usernameRef = useRef("")
  let passwordRef = useRef("")
  // let [result, setResult] = useState("")

  async function submitHandler(e) {
    e.preventDefault()
    const username = usernameRef.current.value
    const password = passwordRef.current.value
    const response = await axios.put('http://127.0.0.1:8000/wiki/login', {
      username,
      password
    })
    const token = response.data
    setToken(token)
    setResult(token)
  }

  return (
    <div className='main'>
      <h2>Login</h2>
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
