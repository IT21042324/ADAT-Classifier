import styles from "./ClassificationResult.module.css";
import { useEffect, useState } from "react";

export const ClassificationResult = ({
  isLoading,
  isClassified,
  classificationResult,
}) => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const orderedAcneTypes = classificationResult
    ? classificationResult.acneTypes
        .map((type, index) => ({
          type,
          probability: classificationResult.probabilities[index],
        }))
        .sort((a, b) => b.probability - a.probability)
    : [];

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderAcneTypes = (types) =>
    types.map((acne, index) => (
      <div
        key={index}
        className={`${styles.acneTypeItem} ${
          index === 0 ? styles.highestProbability : ""
        }`}
      >
        <span className={styles.acneType}>{acne.type}</span>
        <span
          className={
            index === 0 ? styles.highestProbability : styles.acneProbability
          }
        >
          {(acne.probability * 100).toFixed(2)}%
        </span>
      </div>
    ));

  return isClassified && classificationResult ? (
    <div className={styles.resultContainer}>
      {classificationResult.result === "Normal" ? (
        <div className={styles.normalContainer}>
          <div className={styles.result}>
            Classification Result:{" "}
            <span className={styles.resultText}>No Acne</span>
          </div>
          <div className={styles.confidence}>
            Confidence Score:{" "}
            <span className={styles.resultText}>
              {(classificationResult.confidence * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      ) : (
        <div className={styles.acneTypesContainer}>
          <div className={styles.acneTypeGrid}>
            {screenSize < 400
              ? renderAcneTypes(orderedAcneTypes.slice(0, 1))
              : screenSize < 700
              ? renderAcneTypes(orderedAcneTypes.slice(0, 3))
              : renderAcneTypes(orderedAcneTypes)}
          </div>
        </div>
      )}
    </div>
  ) : null;
};
