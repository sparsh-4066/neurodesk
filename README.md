# AI Workspace – Multi-Tool Intelligence Platform

This project is a web-based AI workspace that integrates multiple intelligent tools into a single interface. It allows users to analyze text, documents, images, videos, and facial expressions using modern AI techniques.

The system is built using a React frontend and a FastAPI backend, providing a scalable and modular architecture for integrating different AI models.

----------------------------------

FEATURES

1. Text Summarizer
Generates concise summaries from long text inputs using natural language processing.

2. PDF Document Summarizer
Uploads PDF files and extracts meaningful summaries from the document content.

3. Video Analyzer
Accepts YouTube links or uploaded video files and produces intelligent summaries of the content.

4. Resume Analyzer
Allows users to upload resumes and performs analysis to highlight important information.

5. Image Caption Generator
Uploads images and generates descriptive captions using AI models.

6. Emotion Detection System
Uses the device webcam to detect facial expressions and classify emotions in real time.

Supported emotions:
- Happy
- Sad
- Angry
- Fear
- Surprise
- Disgust
- Neutral

----------------------------------

SYSTEM ARCHITECTURE

Frontend (React + Vite)
        │
        │ REST API
        ▼
Backend (FastAPI)
        │
        │ AI Modules
        ▼
Machine Learning Models

----------------------------------

TECH STACK

Frontend
- React
- Vite
- JavaScript
- CSS

Backend
- FastAPI
- Python

AI / ML Libraries
- OpenAI API
- FER (Facial Emotion Recognition)
- OpenCV
- NumPy

----------------------------------

PROJECT STRUCTURE

backend
│
├── auth
├── database
├── models
├── modules
│   ├── text_summarizer.py
│   ├── image_caption.py
│   ├── resume_analyzer.py
│   └── youtube_summarizer.py
│
├── routes
│   ├── text_routes.py
│   └── emotion_routes.py
│
├── main.py
└── requirements.txt


frontend
│
├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── styles
│
├── package.json
└── vite.config.js

----------------------------------

INSTALLATION GUIDE

1. Clone the repository

git clone <repository-url>
cd project-folder

----------------------------------

BACKEND SETUP

cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

Create a .env file inside backend folder:

OPENAI_API_KEY=your_api_key_here

Run the backend server:

uvicorn main:app --reload

Backend runs on:
http://127.0.0.1:8000

----------------------------------

FRONTEND SETUP

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

----------------------------------

API ENDPOINTS

Authentication
POST /register
POST /login

Text Summarization
POST /api/text/summarize

Emotion Detection
POST /api/emotion

----------------------------------

KEY HIGHLIGHTS

- Modular AI architecture
- Real-time webcam emotion detection
- Multi-tool AI workspace
- React + FastAPI full stack implementation
- Easily extendable for new AI modules

----------------------------------

FUTURE IMPROVEMENTS

- Speech-to-text analysis
- Real-time video summarization
- Chat-based AI assistant
- Advanced resume scoring system
- Multi-language support

----------------------------------

LICENSE

This project is developed for academic and research purposes.
