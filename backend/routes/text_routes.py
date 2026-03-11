from fastapi import APIRouter
from pydantic import BaseModel
from modules.text_summarizer import summarize_text

router = APIRouter()

class TextRequest(BaseModel):
    text: str


@router.post("/summarize")
async def summarize(request: TextRequest):

    summary = summarize_text(request.text)

    return {
        "summary": summary
    }