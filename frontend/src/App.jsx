import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import NeuralBrief from "./components/NeuralBrief";
import DocuMind from "./components/DocuMind";
import VideoSage from "./components/VideoSage";
import ResumeLens from "./components/ResumeLens";
import VisionSpeak from "./components/VisionSpeak";
import EmotionSense from "./components/EmotionSense";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/neuralbrief" element={<NeuralBrief />} />
        <Route path="/documind" element={<DocuMind />} />
        <Route path="/videosage" element={<VideoSage />} />
        <Route path="/resumelens" element={<ResumeLens />} />
        <Route path="/visionspeak" element={<VisionSpeak />} />
        <Route path="/emotionsense" element={<EmotionSense />} />

      </Routes>
    </Router>
  );
}

export default App;