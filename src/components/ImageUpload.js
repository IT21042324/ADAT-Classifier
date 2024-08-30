import React, { useState } from "react";
import "./ImageUpload.css";

function ImageUpload({ onClassification }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the image to your backend for classification
    // For this example, we'll simulate a classification result
    const mockResult = { class: "Dog", confidence: 0.95 };
    onClassification(mockResult);
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        {image && <img src={image} alt="Preview" className="preview-image" />}
        <button type="submit" disabled={!image}>
          Classify Image
        </button>
      </form>
    </div>
  );
}

export default ImageUpload;
