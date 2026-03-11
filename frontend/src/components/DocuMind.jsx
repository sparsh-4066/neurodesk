import React, { useState } from "react";
import "../styles/documind.css";
import ReactMarkdown from "react-markdown";

function DocuMind() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (!file) return;

    try {

      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:8000/api/pdf/summarize", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.summary) {
        setResult(formatSections(data.summary));
      } else {
        setResult("Failed to generate summary.");
      }

    } catch (error) {

      console.error("Error:", error);
      setResult("Error connecting to backend.");

    } finally {

      setLoading(false);

    }

  };


  /* ---------- Convert headings to Markdown ---------- */

  const formatSections = (text) => {

    return text
      .replace(/SUMMARY/g, "# SUMMARY")
      .replace(/EMOTION/g, "# EMOTION")
      .replace(/KEY TOPICS/g, "# KEY TOPICS")
      .replace(/KEYWORDS/g, "# KEYWORDS")
      .replace(/READABILITY/g, "# READABILITY")
      .replace(/KEY CONCEPTS/g, "# KEY CONCEPTS")
      .replace(/IMPORTANT POINTS/g, "# IMPORTANT POINTS")
      .replace(/APPLICATIONS \/ USE CASES/g, "# APPLICATIONS / USE CASES");

  };


  /* ---------- Heading Colors ---------- */

  const MarkdownComponents = {
    h1: ({children}) => {

      const text = children.toString().toUpperCase();

      let className = "doc-heading";

      if (text.includes("SUMMARY")) className = "doc-summary";
      else if (text.includes("EMOTION")) className = "doc-emotion";
      else if (text.includes("KEY TOPICS")) className = "doc-topics";
      else if (text.includes("KEYWORDS")) className = "doc-keywords";
      else if (text.includes("READABILITY")) className = "doc-readability";
      else if (text.includes("KEY CONCEPTS")) className = "doc-topics";
      else if (text.includes("IMPORTANT POINTS")) className = "doc-emotion";
      else if (text.includes("APPLICATIONS")) className = "doc-summary";

      return <h2 className={className}>{children}</h2>;
    }
  };


  return (

    <div className="documind-container">

      {/* LEFT SIDE */}

      <div className="documind-left">

        <h1 className="documind-title">DOCUMIND</h1>

        <p className="documind-subtitle">
          Upload your PDF document and generate an intelligent summary
        </p>

        <input
          type="file"
          accept="application/pdf"
          className="documind-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="documind-button"
          onClick={handleSubmit}
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>

      </div>


      {/* RIGHT SIDE */}

      <div className="documind-right">

        <div className="documind-output">

          {result ? (
            <ReactMarkdown components={MarkdownComponents}>
              {result}
            </ReactMarkdown>
          ) : (
            <p className="documind-placeholder">
              Your summarized PDF will appear here once generated.
            </p>
          )}

        </div>

      </div>

    </div>

  );
}

export default DocuMind;