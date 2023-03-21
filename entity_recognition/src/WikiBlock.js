import { useState } from "react";

function WikiBlock( {onSubmitWiki} ) {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitWiki(text);
  };

  return (
    <div>
      <h3> Input Wiki Topic </h3>
      <form onSubmit={handleSubmit}>
        <label>
          <input 
            value={text} 
            onChange={handleChange}
            rows={1}
            spellCheck={false}
            placeholder="Input wiki topic here..."
            style={{
              textAlignVertical: "top",
              width: 370, 
              height: 20, 
              borderWidth : 1.0
            }}
          />
        </label>
        <br />
        <button type="submit"> submit topic </button>
      </form>
    </div>
  )
}

export default WikiBlock;