# face_extractor.py
import cv2
import mediapipe as mp
import numpy as np

# Initialize MediaPipe Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=True)


def extract_face(img):
    # Convert the image from BGR to RGB as required by MediaPipe
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Process the image to detect face landmarks
    results = face_mesh.process(img_rgb)

    # Check if any face landmarks were detected
    if results.multi_face_landmarks:
        # Initialize variables to track the bounding box of the face
        x_min, y_min, x_max, y_max = img_rgb.shape[1], img_rgb.shape[0], 0, 0

        # Get the indices for the face oval landmarks
        face_oval = mp_face_mesh.FACEMESH_FACE_OVAL

        # Get the first detected face's landmarks
        landmark = results.multi_face_landmarks[0]

        # Iterate over the face oval landmarks to find the bounding box
        for idx in face_oval:
            point = landmark.landmark[idx[0]]
            x, y = int(point.x * img_rgb.shape[1]), int(point.y * img_rgb.shape[0])
            x_min = min(x_min, x)
            y_min = min(y_min, y)
            x_max = max(x_max, x)
            y_max = max(y_max, y)

        # Add a margin to the bounding box
        margin = 5
        x_min = max(0, x_min - margin)
        y_min = max(0, y_min - margin)
        x_max = min(img_rgb.shape[1], x_max + margin)
        y_max = min(img_rgb.shape[0], y_max + margin)

        # Return the cropped face region
        return img[y_min:y_max, x_min:x_max]

    # Return None if no face was detected
    return None
