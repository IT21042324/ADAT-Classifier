import { ExplainableAIPopup } from "../ExplainableAI/explainableAIPopUp";
import { ClassificationResult } from "./ClassificationResult";
import styles from "./ClassificationResultContainer.module.css";
import { BiExpandAlt } from "react-icons/bi";

export const ClassificationResultContainer = ({
  isLoading,
  isClassified,
  classificationResult,
}) => {
  return (
    <div className={styles.container}>
      <ExplainableAIPopup />
      <ClassificationResult
        isLoading={isLoading}
        isClassified={isClassified}
        classificationResult={classificationResult}
      />
    </div>
  );
};
