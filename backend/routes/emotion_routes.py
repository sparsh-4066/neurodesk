from fastapi import APIRouter
from fer import FER
import numpy as np
import cv2
import base64

router = APIRouter()

# Load emotion detection model
detector = FER(mtcnn=True)


@router.post("/emotion")
async def detect_emotion(data: dict):

    try:
        # Get base64 image from frontend
        image_data = data["image"].split(",")[1]
        image_bytes = base64.b64decode(image_data)

        # Convert to numpy array
        np_arr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Detect emotions
        results = detector.detect_emotions(img)

        if len(results) > 0:

            emotions = results[0]["emotions"]

            # Get highest probability emotion
            emotion = max(emotions, key=emotions.get)

            confidence = emotions[emotion]

            return {
                "emotion": emotion,
                "confidence": confidence
            }

        return {
            "emotion": "No face detected",
            "confidence": 0
        }

    except Exception as e:

        return {
            "error": str(e)
        }