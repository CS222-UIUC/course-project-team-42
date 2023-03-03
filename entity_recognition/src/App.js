import React, { Component } from 'react';
import { TextInput } from 'react-native';

function App() {
  return (
    <>
    <div>
      <h1>Named Entity Recognition Tool</h1>
    </div>
    <div>
      <label>
        <h3>Input</h3>
        <TextInput 
          name="TextInput"  
          placeholder="Input text here..."
          multiline={true}
          numberOfLines={10}
          spellCheck={false}
          style={{
            width: 370, 
            height: 100, 
            textAlignVertical: "top",
            borderWidth : 1.0}}
        />
      </label>
      <div>
        <button>
          upload your file
        </button>
      </div>
      <div>
        <button>
          submit
        </button>
      </div>
    </div>
    <div>
      <h3>Result</h3>
      <p>show result here</p>
    </div>
    </>
  );
}

export default App;
