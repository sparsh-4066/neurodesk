import React, { useState } from "react";
import "../styles/resumelens.css";

function ResumeLens() {

  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (!resumeFile) {
      alert("Please upload a resume first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", resumeFile);

    try {

      const response = await fetch("http://127.0.0.1:8000/api/resume/analyze", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      setResult(data.analysis);

    } catch (error) {

      setResult("Error connecting to backend.");

    }

    setLoading(false);
  };


  const formatAnalysis = (text) => {

    if (!text) return null;

    const lines = text.split("\n");

    return lines.map((line, index) => {

      if (line.includes("ATS Score")) {
        return <h2 key={index} className="analysis-score">{line}</h2>;
      }

      if (line.includes("Skills")) {
        return <h3 key={index} className="analysis-heading">{line}</h3>;
      }

      if (line.includes("Missing")) {
        return <h3 key={index} className="analysis-heading">{line}</h3>;
      }

      if (line.includes("Suggestions")) {
        return <h3 key={index} className="analysis-heading">{line}</h3>;
      }

      return <p key={index}>{line}</p>;

    });

  };

  return (

    <div className="resumelens-container">

      {/* LEFT PANEL */}

      <div className="resumelens-left">

        <h1 className="resumelens-title">RESUMELENS</h1>

        <p className="resumelens-subtitle">
          Upload a resume to generate an AI-powered analysis
        </p>

        <div className="resumelens-box">

          <input
            type="file"
            accept=".pdf,.docx"
            className="resumelens-upload"
            onChange={(e) => setResumeFile(e.target.files[0])}
          />

          <button
            className="resumelens-button"
            onClick={handleSubmit}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>

        </div>

      </div>


      {/* RIGHT PANEL */}

      <div className="resumelens-right">

        <div className="resumelens-output">

          {result ? (

            <div className="analysis-content">

              <h2 className="analysis-title">Resume Analysis</h2>

              {formatAnalysis(result)}

            </div>

          ) : (

            <p className="resumelens-placeholder">
              Your resume insights will appear here.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default ResumeLens;