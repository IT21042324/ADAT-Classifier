import { useContext } from "react";
import { SeverityContext } from "../context/SeverityContext";

export const useSeverityContext = () => {
  return {
    ...useContext(SeverityContext),
  };
};
