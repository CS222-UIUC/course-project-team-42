import React, { useState, useRef } from 'react';
import axios from "axios";
import './App.js';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Register() {

  let [username, setUsername] = useState("")
  let [password, setPassword] = useState("")
  let [confirmPassword, setConfirmPassword] = useState("")
  // let [registerResult, setRegisterResult] = useState("")

  async function registerClickHandler(e) {
    e.preventDefault()

    if (password !== confirmPassword) {
      setResult("Passwords do not match.")
      return
    }

    const response = await axios.post('http://127.0.0.1:8000/accounts/register/', {
      username: username,
      password: password
    }, {
      withCredentials: true
    });

    // const output = response.data.message;
    setResult("Sucessfully signed up!")
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={registerClickHandler}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>
      <p>{registerResult}</p>
      <p>Already have an account? <Link to="/login">Login here.</Link></p>
    </div>
  );
}

export default Register;
