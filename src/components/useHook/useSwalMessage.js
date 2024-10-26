import Swal from "sweetalert2";
import styles from "./swalMessage.module.css";

export const useSwalMessage = () => {
  return {
    lowQualityImageError: (extractedFaceImage, quality_score) => {
      Swal.fire({
        title: "Poor Image Quality Detected",
        html: `
          <p>Please upload a clearer image!</p>
          <img id="uploadedImage" src="${extractedFaceImage}" alt="Low Quality Image" class="${styles.uploadedImage}" style="max-width: 100%; height: auto;"/>
        `,
        footer: `
          <p><span class="${
            styles.qualityScore
          }">The image quality score is <strong>${quality_score.toFixed(
          2
        )}</strong></span>, which is below the required <strong>0.4</strong> for accurate classification.</p>
        `,
        confirmButtonText: "Ok",
        customClass: {
          confirmButton: styles.confirmButton,
        },
        buttonsStyling: false,
        didOpen: () => {
          // Set the width of the confirm button to match the image width
          const image = document.querySelector(`.${styles.uploadedImage}`);
          const button = document.querySelector(`.${styles.confirmButton}`);
          if (image && button) {
            button.style.width = `${image.clientWidth}px`;
          }
        },
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
