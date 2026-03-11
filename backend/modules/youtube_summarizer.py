import os
import re
from dotenv import load_dotenv
from groq import Groq
from youtube_transcript_api import YouTubeTranscriptApi

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def extract_video_id(url):

    patterns = [
        r"v=([^&]+)",
        r"youtu\.be\/([^?]+)"
    ]

    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)

    return None


def summarize_youtube(url):

    try:

        video_id = extract_video_id(url)

        if not video_id:
            return "Invalid YouTube URL."

        # Correct API for latest youtube-transcript-api
        transcript = YouTubeTranscriptApi().fetch(video_id)

        text = " ".join([item.text for item in transcript])

        # limit for LLM
        text = text[:6000]

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": """You are an expert video summarizer.

Return output in this format:

SUMMARY
EMOTION
KEY TOPICS
KEYWORDS
MAIN TAKEAWAYS
"""
                },
                {
                    "role": "user",
                    "content": f"Summarize this YouTube transcript:\n\n{text}"
                }
            ],
            temperature=0.3,
            max_tokens=500
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"Error summarizing video: {str(e)}"