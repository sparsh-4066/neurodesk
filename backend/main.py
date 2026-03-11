from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from auth import register, login
from routes.text_routes import router as text_router
from routes.emotion_routes import router as emotion_router
from routes.pdf_routes import router as pdf_router
from routes.youtube_routes import router as youtube_router
from routes.imageroutes import router as image_router   # NEW IMPORT

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",   # added
    "http://localhost:5174",
    "http://127.0.0.1:5174",   # added
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auth routes
app.include_router(register.router)
app.include_router(login.router)

# AI routes
app.include_router(text_router, prefix="/api/text", tags=["NeuralBrief"])
app.include_router(pdf_router, prefix="/api/pdf", tags=["DocuMind"])
app.include_router(emotion_router, prefix="/api", tags=["EmotionSense"])
app.include_router(youtube_router, prefix="/api", tags=["VideoSage"])
app.include_router(image_router, prefix="/api", tags=["VisionSpeak"])   # NEW ROUTE

@app.get("/")
def home():
    return {"message": "NeuroDesk API Running"}