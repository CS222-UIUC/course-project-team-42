function TextBlock() {
  return (
    <div>
      <h3>Input Text</h3>
      <form>
        <label>
          <textarea 
            // ref={inputTextRef} 
            // multiline={true}
            rows={10}
            spellCheck={false}
            placeholder="Input text here..."
            style={{
              textAlignVertical: "top",
              width: 370, 
              height: 100, 
              borderWidth : 1.0
            }}
          />
        </label>
        <br />
        <button type="submit">submit text</button>
      </form>
    </div>
  )
}

export default TextBlock;