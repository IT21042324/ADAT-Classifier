import { ExplainableAIPopup } from "../ExplainableAI/explainableAIPopUp";
import { ClassificationResult } from "./ClassificationResult";
import styles from "./ClassificationResultContainer.module.css";

export const ClassificationResultContainer = ({
  isLoading,
  isClassified,
  classificationResult,
  image,
}) => {
  return (
    <div className={styles.container}>
      <ExplainableAIPopup image={image} />
      <ClassificationResult
        isLoading={isLoading}
        isClassified={isClassified}
        classificationResult={classificationResult}
      />
    </div>
  );
};
