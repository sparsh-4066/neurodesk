import React, { useState } from "react";
import "../styles/neuralbrief.css";

function NeuralBrief() {

  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (!text) return;

    // temporary output (API later)
    setResult("Your summarized text will appear here once backend is connected.");
  };

  return (
    <div className="neuralbrief-container">

      <h1 className="neuralbrief-title">NEURALBRIEF</h1>

      <p className="neuralbrief-subtitle">
        Enter your text and generate a smart summary
      </p>

      <textarea
        className="neuralbrief-input"
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="neuralbrief-button" onClick={handleSubmit}>
        Generate Summary
      </button>

      {result && (
        <div className="neuralbrief-output">
          <h3>SUMMARY</h3>
          <p>{result}</p>
        </div>
      )}

    </div>
  );
}

export default NeuralBrief;