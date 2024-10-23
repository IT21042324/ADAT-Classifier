import { useState } from "react";
import { useBackendAPI } from "./useBackendAPI";
import { useSwalMessage } from "./useSwalMessage";

// Custom hook to handle image uploads
export const useImageUpload = () => {
  const [image, setImage] = useState(null); // Store uploaded or captured image
  const [isLoading, setIsLoading] = useState(false); // State to show loader when uploading
  const maxFileSize = 5 * 1024 * 1024; // Max file size of 5MB

  const {
    imageSizeTooLargeError,
    invalidFileTypeError,
    faceImageExtractionError,
    lowQualityImageError,
  } = useSwalMessage();

  const { uploadImage } = useBackendAPI();

  // Handle image upload via file input
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    // Validate file size (must be <= 5 MB)
    if (file && file.size > maxFileSize) {
      imageSizeTooLargeError();
      e.target.value = "";
      return; // Stop processing if file size is too large
    }

    // Validate file type
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    if (file && validImageTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result); // Convert image to base64
      reader.readAsDataURL(file);
    } else {
      invalidFileTypeError();
      e.target.value = "";
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

      const response = await uploadImage(formData);

      const extractedFaceImage = `data:image/jpeg;base64,${response.data.face_image}`;

      if (response.data.result === "Low Quality") {
        const quality_score = response.data.quality_score;

        // Display error message for low-quality images
        lowQualityImageError(extractedFaceImage, quality_score);

        // Do not proceed with classification results; return early
        setIsLoading(false);
        handleClearImage(); // Clear image from state to make sure it isn't visible in the UI
        return;
      }

      // Set classification result if image quality is acceptable
      setClassificationResult({
        result: response.data.result,
        confidence: response.data.confidence,
        acneTypes: response.data.acne_types || [],
        probabilities: response.data.probabilities || [],
      });

      // Only set the image if it is of sufficient quality
      setImage(extractedFaceImage);

      setIsClassified(true); // Mark image as classified
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to classify image";

      faceImageExtractionError(errorMessage); // Display error message

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
