import React, { useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaInstalod } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { MdAddAPhoto, MdAddPhotoAlternate } from "react-icons/md";
import { TbCaptureFilled } from "react-icons/tb";
import Webcam from "react-webcam";
import styles from "./ImageClassifier.module.css";

export const ImageClassifier = () => {
  const fileInputRef = React.createRef();
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [showCancel, setShowCancel] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);

  const handleIconClick = () => {
    if (showWebcam) {
      capturePhoto();
    } else {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setImage(null);
    setShowCancel(false);
  };

  const toggleCancel = () => {
    setShowCancel(!showCancel);
  };

  const handleCameraIconClick = () => {
    setShowWebcam(true);
  };

  const capturePhoto = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setImage(screenshot);
    setShowWebcam(false);
  };

  const handleClassifyImage = async () => {
    if (!image) return;

    // Convert the image from base64 to a Blob
    const blob = await fetch(image).then((res) => res.blob());

    // Create a FormData object and append the Blob
    const formData = new FormData();
    formData.append("file", blob, "image.jpg"); // The third argument is the file name

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important to set the correct content type
          },
        }
      );

      console.log("Classification Result:", response.data);

      // Replace the original image with the extracted face image
      const extractedFaceImage = `data:image/jpeg;base64,${response.data.face_image}`;
      setImage(extractedFaceImage);
    } catch (error) {
      console.error("Error classifying image:", error);

      // Show SweetAlert2 error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to classify image. Please upload another image.",
      });

      // Clear the uploaded image
      handleClearImage();
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
                <div className={styles.photoContainer} onClick={toggleCancel}>
                  <img
                    src={image}
                    alt="Uploaded"
                    className={`${styles.uploadedImage} ${
                      showCancel ? styles.imageBlurred : ""
                    }`}
                  />
                  {showCancel && (
                    <IoIosCloseCircle
                      className={styles.cancelUpload}
                      onClick={handleClearImage}
                    />
                  )}
                </div>
              ) : showWebcam ? (
                <div className={styles.webcamContainer}>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className={styles.webcam}
                  />
                  <TbCaptureFilled
                    onClick={capturePhoto}
                    className={styles.captureButton}
                  />
                </div>
              ) : (
                <>
                  <div className={styles.buttonContainer}>
                    <div
                      className={styles.uploadSelfie}
                      onClick={handleCameraIconClick}
                    >
                      <MdAddAPhoto className={styles.icon} />
                    </div>
                    <div
                      className={styles.uploadImage}
                      onClick={handleIconClick}
                    >
                      <MdAddPhotoAlternate className={styles.icon} />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className={styles.imagePlaceHolderText}>
                    Upload or capture an image
                  </div>
                </>
              )}
            </div>
          </div>
          {image ? (
            <div className={styles.uploadButton} onClick={handleClassifyImage}>
              <div className={styles.classifyText}>Classify Image</div>
              <FaInstalod style={{ fontSize: "1.5em" }} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
