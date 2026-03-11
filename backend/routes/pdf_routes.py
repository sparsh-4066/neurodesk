from fastapi import APIRouter, UploadFile, File
from modules.pdf_summarizer import summarize_pdf

router = APIRouter()


@router.post("/summarize")
async def summarize(file: UploadFile = File(...)):

    summary = summarize_pdf(file)

    return {"summary": summary}