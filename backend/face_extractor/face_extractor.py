# face_extractor.py
import cv2
import mediapipe as mp
import numpy as np

# Initialize MediaPipe Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=True)


def extract_face(img):
    # Process the image to detect face landmarks
    results = face_mesh.process(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

    # Check if any face landmarks were detected
    if results.multi_face_landmarks:
        x_min, y_min, x_max, y_max = img.shape[1], img.shape[0], 0, 0

        face_oval = mp_face_mesh.FACEMESH_FACE_OVAL
        landmark = results.multi_face_landmarks[0]

        for idx in face_oval:
            point = landmark.landmark[idx[0]]
            x, y = int(point.x * img.shape[1]), int(point.y * img.shape[0])
            x_min = min(x_min, x)
            y_min = min(y_min, y)
            x_max = max(x_max, x)
            y_max = max(y_max, y)

        margin = 5
        x_min = max(0, x_min - margin)
        y_min = max(0, y_min - margin)
        x_max = min(img.shape[1], x_max + margin)
        y_max = min(img.shape[0], y_max + margin)

        return img[y_min:y_max, x_min:x_max]

    return None
