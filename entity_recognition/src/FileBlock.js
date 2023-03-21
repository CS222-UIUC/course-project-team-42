function FileBlock() {
  return (
    <div>
      <h3>Input File</h3>
      <input type="file" 
        // ref={inputFileRef} 
      />
      <br/>
      <button type="submit" > 
        submit file
      </button>
    </div>
  )
}

export default FileBlock;