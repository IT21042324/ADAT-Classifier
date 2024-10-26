import { useContext } from "react";
import { SeverityContext } from "../context/SeverityContext";

export const useSeverityContext = () => {
  // const {
  //   resetSetting,
  //   uploadImage,
  //   setUploadImage,
  //   onshow,
  //   setonshow,
  //   SetCropImage,
  //   imgDimention,
  //   setimgDimention,
  //   // setPain,
  //   Imageshow,
  //   setImageshow,
  //   instruction,
  //   setinstuction,
  //   showdraw,
  // } = useContext(SeverityContext);

  return {
    ...useContext(SeverityContext),
  };
};
