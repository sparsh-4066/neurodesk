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


  const formatSummary = (text) => {

    if (!text) return null;

    const lines = text.split("\n");

    return lines.map((line, index) => {

      if (line.includes("SUMMARY")) {
        return <h3 key={index} className="summary-heading">Summary</h3>;
      }

      if (line.includes("EMOTION")) {
        return <h3 key={index} className="summary-heading">Emotion</h3>;
      }

      if (line.includes("KEY TOPICS")) {
        return <h3 key={index} className="summary-heading">Key Topics</h3>;
      }

      if (line.includes("KEYWORDS")) {
        return <h3 key={index} className="summary-heading">Keywords</h3>;
      }

      if (line.includes("MAIN TAKEAWAYS")) {
        return <h3 key={index} className="summary-heading">Main Takeaways</h3>;
      }

      if (line.trim().startsWith("-") || line.trim().startsWith("*")) {
        return <li key={index}>{line.replace("-", "").replace("*", "")}</li>;
      }

      return <p key={index}>{line}</p>;

    });

  };


  return (

    <div className="videosage-container">

      {/* LEFT SIDE */}

      <div className="videosage-left">

        <h1 className="videosage-title">VIDEOSAGE</h1>

        <p className="videosage-subtitle">
          Paste a YouTube link or upload a video to generate an intelligent summary
        </p>

        <input
          type="text"
          placeholder="Paste YouTube video link..."
          className="videosage-input"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />

        <input
          type="file"
          accept="video/*"
          className="videosage-upload"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />

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

            <div className="summary-content">

              <h2 className="summary-title">Video Analysis</h2>

              {formatSummary(result)}

            </div>

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