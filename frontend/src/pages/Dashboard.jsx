import React from "react";
import "../styles/dashboard.css";

import neuralImg from "../assets/neural.png";
import pdfImg from "../assets/pdf.png";
import videoImg from "../assets/youtube.png";
import resumeImg from "../assets/resume.png";
import imageImg from "../assets/image.png";
import emotionImg from "../assets/emotion.png";

function Dashboard() {

  const openTool = (route) => {
    window.location.href = route;
  };

  return (
    <div className="dashboard">

      <h1 className="dashboard-title">NeuroDesk Dashboard</h1>
      <p className="dashboard-subtitle">Welcome to the AI workspace</p>

      <div className="dashboard-grid">

        {/* LEFT COLUMN */}

        <div className="dashboard-card blue-border" onClick={() => openTool("/neuralbrief")}>
          <img src={neuralImg} alt="NeuralBrief"/>
          <h3>NeuralBrief</h3>
          <p>Text Summarizer</p>
        </div>

        <div className="dashboard-card mix-border" onClick={() => openTool("/documind")}>
          <img src={pdfImg} alt="DocuMind"/>
          <h3>DocuMind</h3>
          <p>PDF Summarizer</p>
        </div>

        <div className="dashboard-card yellow-border" onClick={() => openTool("/videosage")}>
          <img src={videoImg} alt="VideoSage"/>
          <h3>VideoSage</h3>
          <p>YouTube Summarizer</p>
        </div>

        {/* SECOND ROW */}

        <div className="dashboard-card blue-border" onClick={() => openTool("/resumelens")}>
          <img src={resumeImg} alt="ResumeLens"/>
          <h3>ResumeLens</h3>
          <p>Resume Analyzer</p>
        </div>

        <div className="dashboard-card mix-border" onClick={() => openTool("/visionspeak")}>
          <img src={imageImg} alt="VisionSpeak"/>
          <h3>VisionSpeak</h3>
          <p>Image Caption</p>
        </div>

        <div className="dashboard-card yellow-border" onClick={() => openTool("/emotionsense")}>
          <img src={emotionImg} alt="EmotionSense"/>
          <h3>EmotionSense</h3>
          <p>Emotion Detection</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;