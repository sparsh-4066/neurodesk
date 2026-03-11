import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "../styles/emotion.css";

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

  // detect every 2 seconds
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

    <div className="emotion-page">

      {/* TITLE */}

      <h1 className="emotion-title">EMOTIONSENSE</h1>


      {/* MAIN LAYOUT */}

      <div className="emotion-layout">

        {/* WEBCAM */}

        <div className="emotion-camera">

          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="emotion-video"
          />

        </div>


        {/* RESULT */}

        {emotion && (

          <div className="emotion-result">

            <h3 className="emotion-heading">
              DETECTED EMOTION
            </h3>

            <h2 className="emotion-value">
              {emotion.toUpperCase()} {emojiMap[emotion]}
            </h2>

            {confidence && (
              <p className="emotion-confidence">
                Confidence: {Math.round(confidence * 100)}%
              </p>
            )}

            <p className="emotion-assistant">
              Your Live assistant :))
            </p>

          </div>

        )}

      </div>

    </div>

  );
}

export default EmotionSense;