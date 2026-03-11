import os
import fitz  # PyMuPDF
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def summarize_pdf(file):

    try:

        pdf = fitz.open(stream=file.file.read(), filetype="pdf")

        text = ""

        for page in pdf:
            text += page.get_text()

        if len(text.strip()) == 0:
            return "No readable text found in the PDF."

        # limit text size (LLM context)
        text = text[:6000]

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert technical document analyzer and summarizer."
                },
                {
                    "role": "user",
                    "content": f"""
Analyze the following document and generate a clear structured explanation.

Format the output EXACTLY in this structure:

### SUMMARY
Write a detailed but concise explanation of the document.

### KEY CONCEPTS
• Concept 1
• Concept 2
• Concept 3

### IMPORTANT POINTS
• Key takeaway 1
• Key takeaway 2
• Key takeaway 3

### APPLICATIONS / USE CASES
Explain where this concept or technology is used.

### SHORT CONCLUSION
Provide a short final takeaway (2-3 sentences).

Document:
{text}
"""
                }
            ],
            temperature=0.3,
            max_tokens=600
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"Error summarizing PDF: {str(e)}"