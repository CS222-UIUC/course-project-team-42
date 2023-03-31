import React, { useState, useRef } from 'react';
import axios from "axios";
import './App.css';
import TextBlock from './TextBlock';
import FileBlock from './FileBlock';
import WikiBlock from './WikiBlock';
// import { TextInput } from 'react-native';


function App() {

  let inputTextRef = useRef("")
  let inputFileRef = useRef("")

  let [result, setResult] = useState("show results here")
  
  function textClickHandler(e) {
    e.preventDefault()
    let str = inputTextRef.current.value

    // /*
    fetch('./NamedEntityRecognitionTool/manage.py',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({string: str })
    }).then(response => response.json())
    .then(data => {setResult(data)})

    // */
    setResult(str)
  } 


  function fileClickHandler(e) {
    e.preventDefault()
    const file = inputFileRef.current.value
    // /*
    const formData = new FormData()
    formData.append('file', {file})
    fetch('./NamedEntityRecognitionTool/manage.py',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formData
    }).then(response => response.json())
    .then(data => {setResult(data)})
    // */

    setResult(file)
  } 
  

  /* The state for WikiBlock. 
   * resultWiki is a string containing NER output.
   * setResultWiki acts as a function that changes resultWiki, with rerendering.
   */
  let [resultWiki, setResultWiki] = useState("show results here")


  /* handleSubmitWiki is the event handler for the WikiBlock. 
   * It receives a wiki "topic" and calls the corresponding web address,
   * which triggers django backend to run NER algorithm and send back json info,
   * which we then use to update our resultWiki state.
   */
  const handleSubmitWiki = async (topic) => {
    const response = await axios.get(`http://127.0.0.1:8000/wiki/get_ner_on/?topic="${topic}"`, {
      withCredentials: false,
    });
    const output = response.data.entity;
    const output_format = output.replace(/\n/g, "<br />");
    setResultWiki(output_format);
  }


  /* We are currently focusing on 3 primary blocks: TextBlock, FileBlock, WikiBlock 
   * TextBlock receives NER output from user input text.
   * TextBlock receives NER output from user input file.
   * WikiBlock receives NER output from user specified wikipedia topic.
   */
  return (
    <div>
      <h1>Named Entity Recognition Tool</h1>
      <br/>
      <TextBlock />
      <br/>
      <br/>
      <FileBlock />
      <br/>
      <br/>
      <WikiBlock onSubmitWiki={handleSubmitWiki}/>
      <h3>Wiki Result:</h3>
      <p dangerouslySetInnerHTML={{__html: resultWiki}} />
    </div>
  );
}


export default App;
