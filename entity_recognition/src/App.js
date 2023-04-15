import React, { useState, useRef } from 'react';
import axios from "axios";
import './App.css';
import { BrowserRouter, Routes, Router, Route, Link } from "react-router-dom";
import Register from "./register"; 
import Login from "./login"; 


function App() {

  let inputTextRef = useRef("")
  let inputFileRef = useRef("")

  let [result, setResult] = useState("show results here")
  let [token, setToken] = useState("false")
  
  async function textClickHandler(e) {
    e.preventDefault()
    let topic = inputTextRef.current.value
    const response = await axios.get(`http://127.0.0.1:8000/wiki/get_ner_on/?topic="${topic}"`, {
        withCredentials: false,
      });
    const output = response.data.entity;
    const output_format = output.replace(/\n/g, "<br />");
    setResult(output_format)
  }

function fileClickHandler(e) {
    e.preventDefault()
    const file = inputFileRef.current.files[0];

    const formData = new FormData();
    formData.append("file", file);

    axios.post("./NamedEntityRecognitionTool/manage.py", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(response => {
        setResult(response.data);
    }).catch(error => {
      console.error(error);
    });
  } 

  return (
    <BrowserRouter>
      <>
        <div>
          <h1>Named Entity Recognition Tool</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
        <Routes>
          <Route path="/register" element={<Register setResult={setResult}/>} />
          <Route path="/login" element={<Login setResult={setResult} setToken={setToken} />} />
          <Route path="/" element={
            <div>
              <label>
                <h3>Input Text</h3>
                <form onSubmit={textClickHandler}>
                  <label>
                    <textarea 
                      ref={inputTextRef} 
                      // multiline={true}
                      rows={10}
                      spellCheck={false}
                      placeholder="Input text here..."
                      style={{
                        textAlignVertical: "top",
                        width: 370, 
                        height: 100, 
                        borderWidth : 1.0}}/>
                  </label>
                  <br />
                    <button type="submit">submit text</button>
                </form>
              </label>
              <div>
                <h3>Input File (.txt file)</h3>
                <input type="file" ref={inputFileRef} />
              </div>
              <div>
                <button type="submit" onClick={fileClickHandler}> 
                  submit file
                </button>
              </div>
            </div>
          } />
        </Routes>
        <div>
          <h3>Result:</h3>
          <p dangerouslySetInnerHTML={{__html: result}} />
        </div>
      </>
    </BrowserRouter>
  );
}


export default App;
