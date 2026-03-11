from PIL import Image
import io
from transformers import BlipProcessor, BlipForConditionalGeneration

# Load model once
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")


def generate_caption(file):
    try:
        image_bytes = file.file.read()

        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        inputs = processor(image, return_tensors="pt")

        output = model.generate(**inputs)

        caption = processor.decode(output[0], skip_special_tokens=True)

        return caption

    except Exception as e:
        return f"Error generating caption: {str(e)}"