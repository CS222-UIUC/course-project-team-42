import React, { useState, useRef } from 'react';
// import { TextInput } from 'react-native';


function App() {

  let inputTextRef = useRef("")
  let inputFileRef = useRef("")

  let [result, setResult] = useState("show results here")
  
  function textClickHandler(e) {
    e.preventDefault()
    let str = inputTextRef.current.value

    /*
    fetch('./NamedEntityRecognitionTool/manage.py',{
      method: 'POST'
    })

    */
    
    setResult(str)
  } 

  function fileClickHandler(e) {
    e.preventDefault()
    const file = inputFileRef.current.value

    setResult(file)
  } 

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
        <h3>Input File</h3>
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
      <p>{result}</p>
    </div>
    </>
  );
}

export default App;
