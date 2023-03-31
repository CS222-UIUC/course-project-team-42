import React, { useState, useRef } from 'react';
import axios from "axios";
import './App.css';
// import TextBlock from './TextBlock';
// import FileBlock from './FileBlock';
import WikiBlock from './WikiBlock';
// import { TextInput } from 'react-native';


function App() {

  let inputTextRef = useRef("")
  let inputFileRef = useRef("")

  let [result, setResult] = useState("show results here")
  
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
    setResult(output);
  }


  /* We are currently focusing on 3 primary blocks: TextBlock, FileBlock, WikiBlock 
   * TextBlock receives NER output from user input text.
   * TextBlock receives NER output from user input file.
   * WikiBlock receives NER output from user specified wikipedia topic.
   */
  return (
    <>
    <div>
      <h1>Named Entity Recognition Tool</h1>
    </div>
    <div>
      <label>
        <h3>Input Text</h3>
          <form onSubmit={textClickHandler}>
            <label>
               <textarea 
                ref={inputTextRef} 
                multiline={true}
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
    <div>
      <h3>Result:</h3>
      <p dangerouslySetInnerHTML={{__html: result}} />
    </div>
    </>
  );
}


export default App;
