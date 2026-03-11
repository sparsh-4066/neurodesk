import React, { useState } from "react";
import "../styles/videosage.css";

function VideoSage() {

  const [videoLink, setVideoLink] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [result, setResult] = useState("");
const handleSubmit = async () => {

  if (!videoLink) return;

  try {

    const response = await fetch("http://127.0.0.1:8000/api/youtube/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: videoLink })
    });

    const data = await response.json();

    setResult(data.summary);

  } catch (error) {

    console.error(error);
    setResult("Error connecting to backend.");

  }

};

  return (

    <div className="videosage-container">

      {/* LEFT SIDE */}

      <div className="videosage-left">

        <h1 className="videosage-title">VIDEOSAGE</h1>

        <p className="videosage-subtitle">
          Paste a YouTube link or upload a video to generate an intelligent summary
        </p>

        {/* YOUTUBE LINK INPUT */}

        <input
          type="text"
          placeholder="Paste YouTube video link..."
          className="videosage-input"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />

        {/* VIDEO FILE INPUT */}

        <input
          type="file"
          accept="video/*"
          className="videosage-upload"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />

        {/* BUTTON */}

        <button
          className="videosage-button"
          onClick={handleSubmit}
        >
          Generate Summary
        </button>

      </div>


      {/* RIGHT SIDE */}

      <div className="videosage-right">

        <div className="videosage-output">

          {result ? (
            <>
              <h3>SUMMARY</h3>
              <p>{result}</p>
            </>
          ) : (
            <p className="videosage-placeholder">
              Your video summary will appear here once generated.
            </p>
          )}

        </div>

      </div>

    </div>

  );
}

export default VideoSage;