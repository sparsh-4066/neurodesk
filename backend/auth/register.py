from fastapi import APIRouter, HTTPException
from models.user_model import UserRegister
from database.db_connection import users_collection
import bcrypt

router = APIRouter()

@router.post("/register")
def register_user(user: UserRegister):

    existing_user = users_collection.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

    users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    })

    return {"message": "User registered successfully"}