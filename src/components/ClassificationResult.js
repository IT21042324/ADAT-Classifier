import React from "react";
import "./ClassificationResult.css";

function ClassificationResult({ result }) {
  return (
    <>
      <div className="result-container">
        <h2>Classification Result</h2>
        <p>Class: {result.class}</p>
        <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
      </div>
    </>
  );
}

export default ClassificationResult;
