import styles from "./ClassificationResult.module.css";

export const ClassificationResult = ({
  isLoading,
  isClassified,
  classificationResult,
}) => {
  // Find the highest probability value
  const highestProbabilityIndex = classificationResult
    ? classificationResult.probabilities.indexOf(
        Math.max(...classificationResult.probabilities)
      )
    : -1;

  return (
    <div>
      {isLoading && <div className={styles.loadingText}>Classifying...</div>}

      {isClassified && classificationResult && (
        <div className={styles.resultContainer}>
          {classificationResult.result === "Normal" ? (
            <div className={styles.normalContainer}>
              <div className={styles.result}>
                Classification Result:{" "}
                <span className={styles.resultText}>{"No Acne"}</span>
              </div>

              <div className={styles.confidence}>
                Confidence Score:
                <span className={styles.resultText}>
                  {" "}
                  {(classificationResult.confidence * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          ) : (
            <div className={styles.acneTypesContainer}>
              <div className={styles.acneTypeGrid}>
                {classificationResult.acneTypes.map((type, index) => (
                  <div
                    className={`${styles.acneTypeItem} ${
                      index === highestProbabilityIndex
                        ? styles.highestProbability
                        : ""
                    }`}
                    key={index}
                  >
                    <span className={styles.acneType}>{type}</span>
                    <span
                      className={
                        index === highestProbabilityIndex
                          ? styles.acneProbabilityHighest
                          : styles.acneProbability
                      }
                    >
                      {(
                        classificationResult.probabilities[index] * 100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
