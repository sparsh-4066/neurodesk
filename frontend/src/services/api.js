const API_BASE = "http://127.0.0.1:8000";

export const registerUser = async (data) => {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Registration failed");
  }

  return result;
};

export const loginUser = async (data) => {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Invalid email or password");
  }

  return result;
};

/* ================= AI TOOLS ================= */

/* NeuralBrief - Text Summarizer */
export const summarizeText = async (text) => {
  const response = await fetch(`${API_BASE}/api/text/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return response.json();
};

/* DocuMind - PDF Summarizer */
export const summarizePDF = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/api/pdf/summarize`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

/* VideoSage - YouTube Summarizer */
export const summarizeYoutube = async (url) => {
  const response = await fetch(`${API_BASE}/api/youtube/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  return response.json();
};

/* ResumeLens - Resume Analyzer */
export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/api/resume/analyze`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

/* VisionSpeak - Image Caption */
export const captionImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/api/image/caption`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

/* EmotionSense - Emotion Detection */
export const detectEmotion = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/api/emotion/detect`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};