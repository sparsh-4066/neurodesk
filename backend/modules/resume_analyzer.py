import os
import io
from groq import Groq
from dotenv import load_dotenv
import pdfplumber
import pytesseract
from pdf2image import convert_from_bytes
from PIL import Image

# Load environment variables
load_dotenv()

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Tell Python where Tesseract is installed
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Tell pdf2image where Poppler is installed
POPPLER_PATH = r"C:\Users\DELL\Downloads\Release-25.12.0-0\poppler-25.12.0\Library\bin"


# -----------------------------
# Extract text from normal PDF
# -----------------------------
def extract_text_from_pdf(file_stream):

    text = ""

    try:
        with pdfplumber.open(file_stream) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()

                if page_text:
                    text += page_text + "\n"

    except Exception:
        pass

    return text


# -----------------------------
# OCR fallback for scanned PDFs
# -----------------------------
def extract_text_with_ocr(file_bytes):

    images = convert_from_bytes(
        file_bytes,
        poppler_path=POPPLER_PATH
    )

    text = ""

    for img in images:
        text += pytesseract.image_to_string(img)

    return text


# -----------------------------
# Main Resume Analyzer
# -----------------------------
def analyze_resume(file_bytes):

    try:

        # Convert bytes → file-like object
        file_stream = io.BytesIO(file_bytes)

        # Try normal PDF extraction
        resume_text = extract_text_from_pdf(file_stream)

        # If no text found → use OCR
        if not resume_text.strip():
            resume_text = extract_text_with_ocr(file_bytes)

        if not resume_text.strip():
            return "Unable to read text from this resume. Please upload a clearer resume."

        prompt = f"""
You are an ATS resume analyzer.

Analyze the following resume and provide:

1. ATS Score out of 100
2. Skills detected
3. Missing keywords
4. Suggestions to improve the resume

Resume:
{resume_text}
"""

        response = client.chat.completions.create(
    model="llama-3.1-8b-instant",
    messages=[
        {"role": "user", "content": prompt}
    ]
)

        return response.choices[0].message.content

    except Exception as e:
        return f"Error analyzing resume: {str(e)}"