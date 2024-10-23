import Swal from "sweetalert2";
import styles from "./swalMessage.module.css";

export const useSwalMessage = () => {
  return {
    lowQualityImageError: (extractedFaceImage, quality_score) => {
      Swal.fire({
        icon: "error",
        title: "Low Image Quality",
        html: `
                  <p>Please upload a clearer image!</p>
                  <img src="${extractedFaceImage}" alt="Low Quality Image" class="${styles.uploadedImage}" style="max-width: 100%; height: auto;"/>
                `,
        footer: `
                  <p>The uploaded image has a quality score of <strong>${quality_score.toFixed(
                    2
                  )}</strong>.</p>
                  <p>The minimum required quality score is <strong>0.4</strong> for accurate classification.</p>
                `,
      });
    },
    imageSizeTooLargeError: () => {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "The uploaded image exceeds the 5MB size limit. Please upload a smaller image.",
      });
    },
    invalidFileTypeError: () => {
      Swal.fire({
        icon: "error",
        title: "Invalid file type",
        text: "Please upload a valid image (JPEG, PNG, or WebP).",
      });
    },
    faceImageExtractionError: (errorMessage) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    },
  };
};
