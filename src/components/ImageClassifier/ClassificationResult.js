import styles from "./ClassificationResult.module.css";

export const ClassificationResult = ({
  isLoading,
  isClassified,
  classificationResult,
}) => {
  return (
    <div>
      {isLoading && <div className={styles.loadingText}>Classifying...</div>}

      {isClassified && classificationResult && (
        <div className={styles.resultContainer}>
          {classificationResult.result === "Normal" ? (
            <>
              <div className={styles.resultText}>
                Classification Result: {classificationResult.result}
              </div>
              <div className={styles.confidenceText}>
                Confidence: {(classificationResult.confidence * 100).toFixed(2)}
                %
              </div>
            </>
          ) : (
            <div className={styles.acneTypesContainer}>
              <div className={styles.acneTypeGrid}>
                {classificationResult.acneTypes.map((type, index) => (
                  <div className={styles.acneTypeItem} key={index}>
                    <span className={styles.acneType}>{type}</span>
                    <span className={styles.acneProbability}>
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
