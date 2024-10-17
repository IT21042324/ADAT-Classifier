import { useCamera } from "../hook/useCamera";
import { useImageUpload } from "../hook/useImageUpload";

// Custom hook to manage image upload from both camera and file input
export const HandleImageUpload = () => {
  // Use the image upload logic from file input
  const {
    image: fileImage,
    isLoading: isFileLoading,
    handleImageUpload: handleFileImageUpload,
    handleClassifyImage: handleFileClassifyImage,
    handleClearImage: handleFileClearImage,
  } = useImageUpload();

  // Use the camera logic for capturing images
  const {
    webcamRef,
    cameraPermissionGranted,
    showWebcam,
    image: cameraImage,
    setImage: setCameraImage,
    handleCameraIconClick,
    capturePhoto,
  } = useCamera();

  // Determine which image to use (camera or file)
  const image = fileImage || cameraImage;
  const isLoading = isFileLoading;

  // Handle clearing the image (both file and camera)
  const handleClearImage = (setClassificationResult, setIsClassified) => {
    handleFileClearImage(); // Clear file image
    setCameraImage(null); // Clear camera image
    setClassificationResult(null); // Clear classification result
    setIsClassified(false); // Reset classified state
  };

  // Handle image classification for both file and camera images
  const handleClassifyImage = (setClassificationResult, setIsClassified) => {
    if (fileImage) {
      handleFileClassifyImage(
        fileImage,
        setClassificationResult,
        setIsClassified
      );
    } else if (cameraImage) {
      handleFileClassifyImage(
        cameraImage,
        setClassificationResult,
        setIsClassified
      ); // Reuse file classification logic
    }
  };

  return {
    image,
    isLoading,
    webcamRef,
    cameraPermissionGranted,
    showWebcam,
    handleImageUpload: handleFileImageUpload,
    handleClearImage,
    handleClassifyImage,
    handleCameraIconClick,
    capturePhoto,
  };
};
