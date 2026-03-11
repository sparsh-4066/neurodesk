from fastapi import APIRouter, UploadFile, File
from PIL import Image
import io
from transformers import BlipProcessor, BlipForConditionalGeneration

router = APIRouter()

# Load model once when server starts
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")


@router.post("/image/caption")
async def generate_caption(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()

        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        inputs = processor(image, return_tensors="pt")

        output = model.generate(**inputs)

        caption = processor.decode(output[0], skip_special_tokens=True)

        return {"caption": caption}

    except Exception as e:
        return {"caption": f"Error generating caption: {str(e)}"}