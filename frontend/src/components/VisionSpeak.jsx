import React, { useState } from "react";
import "../styles/visionspeak.css";

function VisionSpeak() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleSubmit = async () => {

    if (!file) {
      setResult("Please upload an image first.");
      return;
    }

    try {

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:8000/api/image/caption", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.caption) {
        setResult(data.caption);
      } else {
        setResult("Failed to generate caption.");
      }

    } catch (error) {

      console.error(error);
      setResult("Error connecting to backend.");

    }

  };

  return (

    <div className="visionspeak-container">

      {/* LEFT SIDE */}

      <div className="visionspeak-left">

        <h1 className="visionspeak-title">VISIONSPEAK</h1>

        <p className="visionspeak-subtitle">
          Upload an image to generate a caption
        </p>

        <input
          type="file"
          accept="image/*"
          className="visionspeak-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="visionspeak-button"
          onClick={handleSubmit}
        >
          Generate Caption
        </button>

      </div>

      {/* RIGHT SIDE */}

      <div className="visionspeak-right">

        <div className="visionspeak-output">

          {result ? (
            <>
              <h3>CAPTION</h3>
              <p>{result}</p>
            </>
          ) : (
            <p className="visionspeak-placeholder">
              Your generated caption will appear here.
            </p>
          )}

        </div>

      </div>

    </div>

  );
}

export default VisionSpeak;