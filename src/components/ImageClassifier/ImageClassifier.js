import axios from "axios"; // Axios is used to handle HTTP requests
import React, { useRef, useState } from "react"; // React hooks used for state and references
import { FaInstalod } from "react-icons/fa6"; // Font Awesome icon
import { IoIosCloseCircle } from "react-icons/io"; // Icon to close/cancel the image upload
import { MdAddAPhoto, MdAddPhotoAlternate } from "react-icons/md"; // Icons for adding photo via camera or gallery
import { TbCaptureFilled } from "react-icons/tb"; // Icon for capturing image in webcam
import Webcam from "react-webcam"; // React component for handling webcam
import Swal from "sweetalert2"; // SweetAlert2 for showing alerts
import { ClassificationResult } from "./ClassificationResult"; // Component to display classification results
import styles from "./ImageClassifier.module.css"; // CSS module for styling
import ScaleLoader from "react-spinners/ScaleLoader"; // Loader to show while image is being classified

// Main Image Classifier Component
export const ImageClassifier = () => {
  const fileInputRef = React.createRef(); // Ref for the file input (used for image uploads)
  const webcamRef = useRef(null); // Ref for the webcam to capture images
  const [image, setImage] = useState(null); // State to hold the selected or captured image
  const [showCancel, setShowCancel] = useState(false); // State to show/hide cancel button for image
  const [showWebcam, setShowWebcam] = useState(false); // State to show/hide the webcam
  const [isClassified, setIsClassified] = useState(false); // State to determine if image has been classified
  const [classificationResult, setClassificationResult] = useState(null); // State to hold the result of the classification
  const [isLoading, setIsLoading] = useState(false); // State to show loader when classification is in progress

  // Handle click on icon to upload or capture photo
  const handleIconClick = () => {
    if (showWebcam) {
      capturePhoto(); // Capture photo if webcam is active
    } else {
      fileInputRef.current.click(); // Trigger file input to upload an image
    }
  };

  // Handle image upload via file input
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // Create a new FileReader to read the file
      // To convert image to base64
      reader.onload = (e) => setImage(e.target.result); // Set the image once it's converted to Base64
      reader.readAsDataURL(file); // Read the image file as a Base64 string
    }
  };

  // Clear the uploaded/captured image
  const handleClearImage = () => {
    setImage(null); // Clear the image
    setShowCancel(false); // Hide the cancel button
    setIsClassified(false); // Reset the classified state
    setClassificationResult(null); // Clear the classification result
  };

  // Toggle showing/hiding the cancel button for the image
  const toggleCancel = () => {
    setShowCancel(!showCancel);
  };

  // Show the webcam to capture an image
  const handleCameraIconClick = () => {
    setShowWebcam(true);
  };

  // Capture the image from the webcam
  const capturePhoto = () => {
    const screenshot = webcamRef.current.getScreenshot(); // Get screenshot from the webcam
    setImage(screenshot); // Set the captured image to state
    setShowWebcam(false); // Hide the webcam after capture
  };

  // Handle the image classification by sending the image to the server
  const handleClassifyImage = async () => {
    if (!image) return; // Do nothing if no image is selected

    setIsLoading(true); // Show loader while image is being classified

    // Convert Base64 image to a Blob (binary data)
    const blob = await fetch(image).then((res) => res.blob());

    const formData = new FormData(); // Create new FormData object to send the image
    formData.append("file", blob, "image.jpg"); // Append the image blob to the formData with a file name

    try {
      // Make a POST request to send the image to the server
      const response = await axios.post(
        "http://127.0.0.1:8000/upload/", // URL of the server
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Specify that we're sending form data
          },
        }
      );

      // Extract and set the face image returned from the server
      const extractedFaceImage = `data:image/jpeg;base64,${response.data.face_image}`;
      // convert base64 encoded image to a format that the browser can render
      setImage(extractedFaceImage);

      // Store the classification result and confidence in the state
      setClassificationResult({
        result: response.data.result, // Classification result (e.g., acne type)
        confidence: response.data.confidence, // Confidence score of the result
        acneTypes: response.data.acne_types || [], // Optional list of acne types
        probabilities: response.data.probabilities || [], // Optional probabilities for each acne type
      });

      setIsClassified(true); // Mark the image as classified
    } catch (error) {
      console.error("Error classifying image:", error); // Log error if classification fails

      // Show error message using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to classify image. Please upload an Image of a Face",
      });

      handleClearImage(); // Clear the image and reset states
    } finally {
      setIsLoading(false); // Hide loader after classification process
    }
  };

  return (
    <div className={styles.base}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>Acne Image Classifier</div>
        <div className={styles.beforeImageUploadContainer}>
          <div className={styles.imageContainer}>
            <div
              className={
                image
                  ? styles.imagePlaceHolderWhenImageExists
                  : styles.imagePlaceHolder
              }
            >
              {image ? (
                // Display the uploaded/captured image
                <div className={styles.photoContainer} onClick={toggleCancel}>
                  <img
                    src={image}
                    alt="Uploaded"
                    className={`${styles.uploadedImage} ${
                      showCancel ? styles.imageBlurred : ""
                    }`}
                  />
                  {showCancel && (
                    // Show cancel icon to clear the image
                    <IoIosCloseCircle
                      className={styles.cancelUpload}
                      onClick={handleClearImage}
                    />
                  )}
                </div>
              ) : showWebcam ? (
                // Show webcam if active
                <div className={styles.webcamContainer}>
                  <Webcam
                    audio={false} // No audio for webcam
                    ref={webcamRef} // Reference to webcam component
                    screenshotFormat="image/jpeg" // Format for captured image
                    className={styles.webcam}
                  />

                  <TbCaptureFilled
                    onClick={capturePhoto} // Capture photo when icon clicked
                    className={styles.captureButton}
                  />
                </div>
              ) : (
                // Show icons to either upload or capture an image
                <>
                  <div className={styles.buttonContainer}>
                    <div
                      className={styles.uploadSelfie}
                      onClick={handleCameraIconClick}
                    >
                      <MdAddAPhoto className={styles.icon} />{" "}
                      {/* Camera icon */}
                    </div>
                    <div
                      className={styles.uploadImage}
                      onClick={handleIconClick}
                    >
                      <MdAddPhotoAlternate className={styles.icon} />{" "}
                      {/* Upload icon */}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload} // Handle file input change
                      ref={fileInputRef} // Reference to file input
                      style={{ display: "none" }} // Hide the actual file input element
                    />
                  </div>
                  <div className={styles.imagePlaceHolderText}>
                    Upload or capture an image
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Show classify button when an image is selected but not classified yet */}
          {image && !isClassified ? (
            <div className={styles.uploadButton} onClick={handleClassifyImage}>
              {isLoading ? (
                // Show loader while classification is in progress
                <ScaleLoader color="#fff" height={15} loading={isLoading} />
              ) : (
                // Show classify button and icon
                <>
                  <div className={styles.classifyText}>Classify Image</div>
                  <FaInstalod style={{ fontSize: "1.5em" }} />
                </>
              )}
            </div>
          ) : null}
        </div>

        {/* Display classification results */}
        <ClassificationResult
          isLoading={isLoading} // Pass loading state
          isClassified={isClassified} // Pass classified state
          classificationResult={classificationResult} // Pass the result to child component
        />
      </div>
    </div>
  );
};
