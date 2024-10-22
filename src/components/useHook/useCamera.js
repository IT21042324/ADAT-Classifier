import { useState, useRef } from "react";
import Swal from "sweetalert2"; // SweetAlert for error messages

// Custom hook to handle camera logic
export const useCamera = () => {
  const webcamRef = useRef(null); // Reference for the webcam
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false); // State for camera permission
  const [showWebcam, setShowWebcam] = useState(false); // State to show/hide the webcam
  const [image, setImage] = useState(null); // State to hold captured image

  // Request camera access and handle permission
  const handleCameraIconClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermissionGranted(true); // Permission granted
      setShowWebcam(true); // Show webcam
      stream.getTracks().forEach((track) => track.stop()); // Stop stream after permission is granted
    } catch (error) {
      if (error.name === "NotAllowedError") {
        Swal.fire({
          icon: "error",
          title: "Camera Access Blocked",
          text: "It seems you have blocked camera access. Please enable it in your browser settings to capture a photo.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Camera Error",
          text: "An error occurred while trying to access the camera. Please try again or use a different device.",
        });
      }

      setCameraPermissionGranted(false); // Permission denied
      setShowWebcam(false); // Hide webcam
    }
  };

  // Capture photo from webcam
  const capturePhoto = () => {
    const screenshot = webcamRef.current.getScreenshot(); // Capture photo
    setImage(screenshot); // Set the captured image
    setShowWebcam(false); // Hide the webcam after capturing
  };

  return {
    webcamRef,
    cameraPermissionGranted,
    showWebcam,
    image,
    setImage,
    handleCameraIconClick,
    capturePhoto,
  };
};
