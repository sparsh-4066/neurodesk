import React, { useState } from "react";
import "../styles/neuralbrief.css";

function DocuMind() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (!file) return;

    setResult(
      "This is where the summarized PDF content will appear once the backend API is connected."
    );
  };

  return (
    <div className="neuralbrief-container">

      <h1 className="neuralbrief-title">DOCUMIND</h1>

      <p className="neuralbrief-subtitle">
        Upload your PDF document and generate an intelligent summary
      </p>

      <div className="neuralbrief-box">

        <input
          type="file"
          accept="application/pdf"
          className="pdf-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="neuralbrief-button" onClick={handleSubmit}>
          Generate Summary
        </button>

      </div>

      {result && (
        <div className="neuralbrief-output">
          <h3>SUMMARY</h3>
          <p>{result}</p>
        </div>
      )}

    </div>
  );
}

export default DocuMind;