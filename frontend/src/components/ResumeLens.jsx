import React, { useState } from "react";
import "../styles/neuralbrief.css";

function ResumeLens() {

  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (!resumeFile) return;

    setResult(
      "This is where the resume analysis will appear once the backend API is connected."
    );
  };

  return (
    <div className="neuralbrief-container">

      <h1 className="neuralbrief-title">RESUMELENS</h1>

      <p className="neuralbrief-subtitle">
        Upload a resume to generate an AI-powered analysis
      </p>

      <div className="neuralbrief-box">

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="pdf-upload"
          onChange={(e) => setResumeFile(e.target.files[0])}
        />

        <button
          className="neuralbrief-button"
          onClick={handleSubmit}
          disabled={!resumeFile}
        >
          Analyze Resume
        </button>

      </div>

      {result && (
        <div className="neuralbrief-output">
          <h3>ANALYSIS</h3>
          <p>{result}</p>
        </div>
      )}

    </div>
  );
}

export default ResumeLens;