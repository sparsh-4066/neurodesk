from fastapi import APIRouter
from pydantic import BaseModel
from modules.youtube_summarizer import summarize_youtube

router = APIRouter()


class VideoRequest(BaseModel):
    url: str


@router.post("/youtube/summarize")
def summarize_video(request: VideoRequest):

    summary = summarize_youtube(request.url)

    return {"summary": summary}