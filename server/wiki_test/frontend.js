import React, { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {

  const [result, setResult] = useState("show results here")
  const [wiki, setWiki] = useState("")

  const handleChange = (event) => {
    setWiki(event.target.value);
  }
  
  async function textClickHandler(e) {
    e.preventDefault()
    
    const response = await axios.get(`http://127.0.0.1:8000/wiki/get_ner_freq/?topic="${wiki}"`, {
        withCredentials: false,
      });
      setResult(response.data.ent10 + "<br />" + response.data.freq10);
  }

  return (
    <div>
      <div>
        <h1>Named Entity Recognition Tool</h1>
      </div>

      <div>
        <h3>Input Text</h3>
          <form onSubmit={textClickHandler}>
            <input value={wiki} onChange={handleChange}/>
            <br />
              <button type="submit">submit text</button>
           </form>
      
      
    </div>
    <div>
      <h3>Result:</h3>
      <p dangerouslySetInnerHTML={{__html: result}} />
    </div>
    </div>
  );
}


export default App;