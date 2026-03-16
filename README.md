# NeuroDesk — AI Productivity Workspace

NeuroDesk is a full-stack AI productivity platform designed to combine multiple intelligent tools into a single workspace. The system integrates modern web technologies with powerful AI APIs to help users analyze documents, generate content, summarize information, and automate various productivity tasks.

The application is composed of two main components:

1. **Frontend (User Interface)** – built with modern JavaScript tools.
2. **Backend (API Server)** – built using Python and FastAPI, responsible for handling AI operations and communicating with external APIs.

Both components must be running simultaneously for the application to function properly.

---

# Table of Contents

1. Project Overview
2. Features
3. Technology Stack
4. Project Structure
5. Prerequisites
6. Cloning the Repository
7. Backend Setup (Python + FastAPI)
8. Environment Variable Configuration
9. Running the Backend Server
10. Frontend Setup (React + Vite)
11. Running the Frontend
12. Accessing the Application
13. Troubleshooting
14. Notes for Developers

---

# 1. Project Overview

NeuroDesk is designed as a **centralized AI workspace** where multiple AI-powered tools can be accessed from a single dashboard.

The backend server handles all AI-related processing, while the frontend provides a clean and interactive interface for user interaction.

The system uses modern APIs such as **Groq** and **Google Gemini** to perform AI-driven tasks.

---

# 2. Features

NeuroDesk provides several intelligent utilities including:

• Text Summarization
• PDF Summarization
• Video Analysis
• Resume Analysis
• Image Caption Generation
• Emotion Detection
• AI-powered Content Assistance

All these tools are accessible through a single unified dashboard.

---

# 3. Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML/CSS

### Backend

* Python
* FastAPI
* Uvicorn
* Python-dotenv

### AI APIs

* Groq API
* Google Gemini API

### Development Tools

* Node.js
* npm
* Python Virtual Environment (venv)

---

# 4. Project Structure

After cloning the repository, the project directory should look like this:

```
NeuroDesk
│
├── backend
│   ├── main.py
│   ├── requirements.txt
│   ├── .env (created locally)
│   └── venv (created locally)
│
├── frontend
│   ├── package.json
│   ├── node_modules (created locally)
│   └── src
│
└── README.md
```

Important notes:

• `venv` is created locally and should not be pushed to GitHub
• `node_modules` is also created locally
• `.env` contains API keys and must remain private

---

# 5. Prerequisites

Before running NeuroDesk, ensure that the following software is installed on your system.

---

## Python

Download Python from:

https://www.python.org/downloads/

Verify installation:

```
python --version
```

Recommended version: **Python 3.9 or higher**

---

## Node.js

Download Node.js from:

https://nodejs.org/

Verify installation:

```
node -v
npm -v
```

Node.js automatically installs **npm**, which is required for installing frontend dependencies.

---

## Git

Download Git from:

https://git-scm.com/downloads

Verify installation:

```
git --version
```

---

# 6. Clone the Repository

Clone the NeuroDesk repository from GitHub:

```
git clone https://github.com/sparsh-4066/neurodesk.git
```

Move into the project directory:

```
cd neurodesk
```

---

# 7. Backend Setup (FastAPI)

The backend server processes requests, communicates with AI APIs, and returns responses to the frontend.

Navigate to the backend folder:

```
cd backend
```

---

## Step 1 — Create a Virtual Environment

Create a Python virtual environment:

```
python -m venv venv
```

This will create a directory named:

```
venv
```

inside the backend folder.

Virtual environments isolate project dependencies and prevent conflicts with other Python projects.

---

## Step 2 — Activate the Virtual Environment

### Windows

```
venv\Scripts\activate
```

### Mac / Linux

```
source venv/bin/activate
```

After activation, your terminal should display something like:

```
(venv) ...
```

---

## Step 3 — Install Backend Dependencies

Install all required Python packages using:

```
pip install -r requirements.txt
```

This command installs all libraries listed in `requirements.txt`, including:

* FastAPI
* Uvicorn
* Groq SDK
* Google Generative AI SDK
* Python-dotenv
* other dependencies required for the backend server

---

# 8. Environment Variable Configuration

The application requires API keys to communicate with AI services.

Create a new file named:

```
.env
```

inside the **backend** folder.

Add the following environment variables:

```
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
```

Each user running the project should generate their own API keys.

---

## Obtaining API Keys

### Groq API

Visit:

https://console.groq.com/keys

Generate an API key and paste it in the `.env` file.

---

### Gemini API

Visit:

https://aistudio.google.com/app/apikey

Generate an API key and paste it in the `.env` file.

---

# 9. Running the Backend Server

Once dependencies are installed and the environment variables are configured, start the backend server.

Run:

```
python -m uvicorn main:app --reload
```

The server will start at:

```
http://127.0.0.1:8000
```

You can open this address in a browser to verify that the API server is running.

---

# 10. Frontend Setup (React Application)

Open a **new terminal window** and navigate to the frontend directory.

```
cd neurodesk/frontend
```

---

## Install Frontend Dependencies

Run:

```
npm install
```

This command reads the `package.json` file and installs all required JavaScript libraries.

Examples include:

* React
* Vite
* Axios
* other frontend dependencies

The dependencies will be installed inside:

```
node_modules
```

---

# 11. Running the Frontend

Start the frontend development server:

```
npm run dev
```

The frontend application will start at:

```
http://localhost:5173
```

---

# 12. Accessing NeuroDesk

Once both servers are running:

Backend

```
http://127.0.0.1:8000
```

Frontend

```
http://localhost:5173
```

Open the frontend URL in your browser to use the NeuroDesk interface.

The frontend will automatically communicate with the backend API.

---

# 13. Troubleshooting

## Backend not starting

Ensure the virtual environment is activated before running the server.

```
venv\Scripts\activate
```

---

## Missing Python packages

Run:

```
pip install -r requirements.txt
```

---

## Node modules missing

Run:

```
npm install
```

inside the frontend directory.

---

## API not responding

Check that the `.env` file exists inside the backend directory and contains valid API keys.

---

## Port already in use

If port 8000 is already occupied, run:

```
python -m uvicorn main:app --reload --port 8001
```

---

# 14. Notes for Developers

• Do not upload `.env` files to GitHub.
• Do not upload `venv` or `node_modules`.
• Each developer should create their own environment and install dependencies locally.

---

# Author

Sparsh Shukla
B.Tech Computer Science — IIIT Jabalpur

NeuroDesk was developed as an AI productivity platform integrating multiple intelligent tools into a unified workspace.
