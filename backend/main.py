from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from auth import register, login

app = FastAPI()

# Allow frontend to connect
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

# Routes
app.include_router(register.router)
app.include_router(login.router)

@app.get("/")
def home():
    return {"message": "NeuroDesk API Running"}