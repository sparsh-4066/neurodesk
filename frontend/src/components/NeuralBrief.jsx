import React, { useState } from "react";
import "../styles/neuralbrief.css";
import { summarizeText } from "../services/api";

function NeuralBrief() {

  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (!text) return;

    setLoading(true);

    try {

      const response = await summarizeText(text);
      setResult(response.summary);

    } catch (error) {

      console.error("Error:", error);
      setResult("Failed to generate summary.");

    } finally {

      setLoading(false);

    }
  };

const formatOutput = (text) => {

  if (!text) return null;

  const lines = text.split("\n");

  return lines.map((line, index) => {

    const clean = line.replace(/\*/g, "").trim().toUpperCase();

    if (clean === "SUMMARY")
      return <h3 key={index} className="section-title summary">SUMMARY</h3>;

    if (clean === "EMOTION")
      return <h3 key={index} className="section-title emotion">EMOTION</h3>;

    if (clean === "KEY TOPICS")
      return <h3 key={index} className="section-title topics">KEY TOPICS</h3>;

    if (clean === "KEYWORDS")
      return <h3 key={index} className="section-title keywords">KEYWORDS</h3>;

    if (clean === "READABILITY")
      return <h3 key={index} className="section-title readability">READABILITY</h3>;

    return <p key={index} className="summary-text">{line.replace(/\*/g, "")}</p>;

  });

};

  return (

    <div className="neuralbrief-container">

      <div className="neuralbrief-left">

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
          {loading ? "Generating..." : "Generate Summary"}
        </button>

      </div>


      <div className="neuralbrief-right">

        <div className="summary-card">

          {result ? formatOutput(result) : (
            <p className="summary-placeholder">
              Your summarized text will appear here once generated.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default NeuralBrief;