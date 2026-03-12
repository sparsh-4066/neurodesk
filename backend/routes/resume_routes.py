from fastapi import APIRouter, UploadFile, File
from modules.resume_analyzer import analyze_resume

router = APIRouter()

@router.post("/resume/analyze")
async def analyze_resume_route(file: UploadFile = File(...)):

    try:
        contents = await file.read()   # read uploaded file

        result = analyze_resume(contents)

        return {"analysis": result}

    except Exception as e:
        return {"analysis": f"Error analyzing resume: {str(e)}"}