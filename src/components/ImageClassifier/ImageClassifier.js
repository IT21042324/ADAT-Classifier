import { useRef, useState } from "react";
import { FaInstalod } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { MdAddAPhoto, MdAddPhotoAlternate } from "react-icons/md";
import { TbCaptureFilled } from "react-icons/tb";
import ScaleLoader from "react-spinners/ScaleLoader";
import Webcam from "react-webcam";
import { useHandleImageUpload } from "../useHook/useHandleImageUpload";
import { ClassificationResult } from "./ClassificationResult";
import styles from "./ImageClassifier.module.css";
import { ClassificationResultContainer } from "./ClassificationResultContainer";

// Main Image Classifier Component
export const ImageClassifier = () => {
  const fileInputRef = useRef(); // Ref for the file input (used for image uploads)
  const [showCancel, setShowCancel] = useState(false); // State to show/hide cancel button for image
  const [isClassified, setIsClassified] = useState(false); // State to determine if image has been classified
  const [classificationResult, setClassificationResult] = useState(null); // State to hold the result of the classification

  // Use the unified image upload logic
  const {
    image,
    isLoading,
    webcamRef,
    cameraPermissionGranted,
    showWebcam,
    handleImageUpload,
    handleClearImage,
    handleClassifyImage,
    handleCameraIconClick,
    capturePhoto,
  } = useHandleImageUpload();

  // Handle click on icon to upload or capture photo
  const handleIconClick = () => {
    if (showWebcam) {
      capturePhoto(); // Capture photo if webcam is active
    } else {
      fileInputRef.current.click(); // Trigger file input to upload an image
    }
  };

  // Toggle showing/hiding the cancel button for the image
  const toggleCancel = () => {
    setShowCancel(!showCancel);
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
                      onClick={() =>
                        handleClearImage(
                          setClassificationResult,
                          setIsClassified
                        )
                      }
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
                  {cameraPermissionGranted && (
                    <TbCaptureFilled
                      onClick={capturePhoto}
                      className={styles.captureButton}
                    />
                  )}
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

          {image && !isClassified ? (
            <div
              className={styles.uploadButton}
              onClick={() =>
                handleClassifyImage(setClassificationResult, setIsClassified)
              }
            >
              {isLoading ? (
                <ScaleLoader color="#fff" height={15} loading={isLoading} />
              ) : (
                <>
                  <div className={styles.classifyText}>Classify Image</div>
                  <FaInstalod style={{ fontSize: "1.5em" }} />
                </>
              )}
            </div>
          ) : null}
        </div>

        {classificationResult && (
          <ClassificationResultContainer
            isLoading={isLoading}
            isClassified={isClassified}
            classificationResult={classificationResult}
          />
        )}
      </div>
    </div>
  );
};
