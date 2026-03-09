from fastapi import APIRouter, HTTPException
from models.user_model import UserLogin
from database.db_connection import users_collection
import bcrypt

router = APIRouter()

@router.post("/login")
def login_user(user: UserLogin):

    db_user = users_collection.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not bcrypt.checkpw(user.password.encode('utf-8'), db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid password")

    return {"message": "Login successful"}