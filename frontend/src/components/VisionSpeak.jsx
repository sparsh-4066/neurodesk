import React, { useState } from "react";
import "../styles/neuralbrief.css";

function VisionSpeak() {

  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (!imageFile) return;

    setResult(
      "This is where the AI-generated image caption will appear once the backend API is connected."
    );
  };

  return (
    <div className="neuralbrief-container">

      <h1 className="neuralbrief-title">VISIONSPEAK</h1>

      <p className="neuralbrief-subtitle">
        Upload an image to generate an AI caption
      </p>

      <div className="neuralbrief-box">

        <input
          type="file"
          accept="image/*"
          className="pdf-upload"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button
          className="neuralbrief-button"
          onClick={handleSubmit}
          disabled={!imageFile}
        >
          Generate Caption
        </button>

      </div>

      {result && (
        <div className="neuralbrief-output">
          <h3>CAPTION</h3>
          <p>{result}</p>
        </div>
      )}

    </div>
  );
}

export default VisionSpeak;