import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def summarize_text(text: str):

    if not text or len(text.strip()) == 0:
        return "No text provided."

    try:

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": """
You are an advanced text analysis assistant.

For any paragraph given, provide:
1. A concise summary
2. Emotional tone of the paragraph
3. Key topics discussed
4. Important keywords
5. Readability level (Beginner / Intermediate / Advanced)

Format the response clearly using headings like:

SUMMARY
EMOTION
KEY TOPICS
KEYWORDS
READABILITY
"""
                },
                {
                    "role": "user",
                    "content": f"Analyze the following text:\n\n{text}"
                }
            ],
            temperature=0.3,
            max_tokens=300
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"Error generating summary: {str(e)}"