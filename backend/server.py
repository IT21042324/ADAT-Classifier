from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from PIL import Image
import io
import base64
import cv2
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from face_extractor.face_extractor import extract_face

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        open_cv_image = np.array(image)

        # Detect and extract the face
        face_image = extract_face(open_cv_image)

        if face_image is None:
            raise HTTPException(
                status_code=400,
                detail="No face detected in the image. Please upload another image.",
            )

        # Convert the extracted face image to a PIL image
        face_image_pil = Image.fromarray(face_image)

        # Save the face image to a buffer
        buffered = io.BytesIO()
        face_image_pil.save(buffered, format="JPEG")
        face_image_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

        return {"filename": file.filename, "face_image": face_image_str}

    except Exception as e:
        return JSONResponse(content={"message": str(e)}, status_code=400)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
