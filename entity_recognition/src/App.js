import React, { useState, useRef } from 'react';
import axios from "axios";
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { SelectButton } from 'primereact/selectbutton';
import Register from "./register"; 
import Login from "./login"; 


function App() {

  let inputTextRef = useRef("")
  let inputFileRef = useRef("")
  const [value, setValue] = useState(null);
  const items = [
      { name: 'English', value: 1 },
      { name: 'Chinese', value: 2 },
      { name: 'Spanish', value: 3 }
  ];

  let [result, setResult] = useState("show results here")
  let [token, setToken] = useState("false")
  
  async function textClickHandler(e) {
    e.preventDefault()
    if (token !== "Successfully login!") {
      setResult("Please log in first!")
      return
    }
    setResult("loading")
    let topic = inputTextRef.current.value
    const response = await axios.get(`http://127.0.0.1:8000/wiki/get_ner_on/?topic="${topic}"`, {
        withCredentials: false,
      });
    const output = response.data.entity;
    const output_format = output.replace(/\n/g, "<br />");
    setResult(output_format)
  }

  async function fileClickHandler(e) {
    e.preventDefault()
    if (token !== "Successfully login!") {
      setResult("Please log in first!")
      return
    }
    setResult("loading")
    const file = inputFileRef.current.files[0];

    const formData = new FormData();
    formData.append("file", file, file.name);
    const response = await axios.post('http://127.0.0.1:8000/wiki/upload', formData)
    const output = response.data;
    const output_format = output.replace(/\n/g, "<br />");
    setResult(output_format)
    } 

  return (
    <BrowserRouter>
      <>
        <div className="header">
          <h1>Named Entity Recognition Tool</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
        <Routes>
          <Route path="/register" element={<Register setResult={setResult} />} />
          <Route path="/login" element={<Login setResult={setResult} setToken={setToken} />} />
          <Route path="/" element={
            <div className="main">
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
                  <div>
                  <SelectButton value={value} onChange={(e) => setValue(e.value)} optionLabel="name" options={items} />  
                  </div>
                  <button type="submit" className="submit-button">submit text</button>
                </form>
              </label>
              <h3>Input File (.txt file)</h3>
              <form onSubmit={fileClickHandler} enctype="multipart/form-data">
              <label>
                <input type="file" ref={inputFileRef} accept='.txt' id='file'/>
                <br />
                <button type="submit" className="submit-button"> 
                  submit file
                </button>
              </label>
              </form>

            </div>
          } />
        </Routes>
        <div className="result">
          <h3>Result:</h3>
          <p dangerouslySetInnerHTML={{__html: result}} />
        </div>
      </>
    </BrowserRouter>
  );  
}


export default App;
