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
      <div className={styles.explainButton}>
        <BiExpandAlt />
      </div>
      <ClassificationResult
        isLoading={isLoading}
        isClassified={isClassified}
        classificationResult={classificationResult}
      />
    </div>
  );
};
