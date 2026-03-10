import React, { useState } from "react";
import "../styles/neuralbrief.css";

function VideoSage() {

  const [videoLink, setVideoLink] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (!videoLink && !videoFile) return;

    setResult(
      "This is where the video summary or analysis will appear once the backend API is connected."
    );
  };

  return (
    <div className="neuralbrief-container">

      <h1 className="neuralbrief-title">VIDEOSAGE</h1>

      <p className="neuralbrief-subtitle">
        Paste a YouTube link or upload a video to generate an intelligent summary
      </p>

      {/* YOUTUBE LINK INPUT */}

      <div className="neuralbrief-box">

        <input
          type="text"
          placeholder="Paste YouTube video link..."
          className="video-link-input"
          value={videoLink}
          disabled={videoFile !== null}
          onChange={(e) => setVideoLink(e.target.value)}
        />

      </div>

      {/* VIDEO FILE INPUT */}

      <div className="neuralbrief-box">

        <input
          type="file"
          accept="video/*"
          className="pdf-upload"
          disabled={videoLink.length > 0}
          onChange={(e) => setVideoFile(e.target.files[0])}
        />

        <button
          className="neuralbrief-button"
          onClick={handleSubmit}
          disabled={!videoLink && !videoFile}
        >
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

export default VideoSage;