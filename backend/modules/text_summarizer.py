import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def summarize_text(text):

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a professional text summarizer."
            },
            {
                "role": "user",
                "content": f"Summarize the following text clearly and concisely:\n\n{text}"
            }
        ],
        max_tokens=200,
        temperature=0.3
    )

    return response.choices[0].message.content