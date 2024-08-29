import React, { useState } from "react";
import { Header } from "../header/Header";
import "./Home.css";
import { ImageClassifier } from "../ImageClassifier/ImageClassifier";

function Home() {
  const [classificationResult, setClassificationResult] = useState(null);

  const handleClassification = (result) => {
    setClassificationResult(result);
  };

  return (
    <>
      <Header />
      <ImageClassifier />
    </>
  );
}

export default Home;
