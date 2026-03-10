from fastapi import APIRouter
from modules.text_summarizer import summarize_text

router = APIRouter()

@router.post("/summarize")
async def summarize(data: dict):

    text = data["text"]

    summary = summarize_text(text)

    return {"summary": summary}