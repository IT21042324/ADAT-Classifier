import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

// Custom hook to handle image uploads
export const useImageUpload = () => {
  const [image, setImage] = useState(null); // Store uploaded or captured image
  const [isLoading, setIsLoading] = useState(false); // State to show loader when uploading

  // Handle image upload via file input
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    // Validate file type
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    if (file && validImageTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result); // Convert image to base64
      reader.readAsDataURL(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid file type",
        text: "Please upload a valid image (JPEG, PNG, or WebP).",
      });
    }
  };

  // Clear the uploaded/captured image
  const handleClearImage = () => {
    setImage(null);
  };

  // Handle the image classification by sending the image to the server
  const handleClassifyImage = async (
    image,
    setClassificationResult,
    setIsClassified
  ) => {
    if (!image) return;

    setIsLoading(true); // Show loader while image is being classified

    try {
      // Convert Base64 image to a Blob
      const blob = await fetch(image).then((res) => res.blob());
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");

      const response = await axios.post(
        "http://127.0.0.1:8000/acne/classifier/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const extractedFaceImage = `data:image/jpeg;base64,${response.data.face_image}`;
      setImage(extractedFaceImage);

      setClassificationResult({
        result: response.data.result,
        confidence: response.data.confidence,
        acneTypes: response.data.acne_types || [],
        probabilities: response.data.probabilities || [],
      });

      setIsClassified(true); // Mark image as classified
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to classify image";

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });

      handleClearImage(); // Clear image if classification failed
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return {
    image,
    isLoading,
    setImage,
    handleImageUpload,
    handleClassifyImage,
    handleClearImage,
  };
};
