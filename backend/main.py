from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from auth import register, login
from routes.text_routes import router as text_router
from routes.emotion_routes import router as emotion_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
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
app.include_router(emotion_router, prefix="/api", tags=["EmotionSense"])

@app.get("/")
def home():
    return {"message": "NeuroDesk API Running"}