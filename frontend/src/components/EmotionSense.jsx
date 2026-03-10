import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "../styles/neuralbrief.css";

function EmotionSense() {

  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState("");
  const [confidence, setConfidence] = useState("");

  const detectEmotion = async () => {

    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();

    const res = await fetch("http://127.0.0.1:8000/api/emotion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageSrc })
    });

    const data = await res.json();

    if (data.emotion) {
      setEmotion(data.emotion);
    }

    if (data.confidence) {
      setConfidence(data.confidence);
    }
  };

  // auto detect every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      detectEmotion();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const emojiMap = {
    happy: "😄",
    sad: "😢",
    angry: "😠",
    surprise: "😲",
    fear: "😨",
    disgust: "🤢",
    neutral: "😐"
  };

  return (
    <div className="neuralbrief-container">

      <h1 className="neuralbrief-title">EMOTIONSENSE</h1>

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={420}
      />

      {emotion && (
        <div className="neuralbrief-output">

          <h3>DETECTED EMOTION</h3>

          <h2 style={{fontSize:"34px", marginTop:"10px"}}>
            {emotion.toUpperCase()} {emojiMap[emotion]}
          </h2>

          {confidence && (
            <p style={{opacity:0.8}}>
              Confidence: {Math.round(confidence * 100)}%
            </p>
          )}

          <p style={{marginTop:"10px", opacity:0.7}}>
            Your Live assistant :))
          </p>

        </div>
      )}

    </div>
  );
}

export default EmotionSense;