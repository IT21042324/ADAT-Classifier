import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBackendAPI } from "../useHook/useBackendAPI";

export const SeverityContext = createContext();

function SeverityContextProvider({ children }) {
  const {
    severity_Detection,
    preictimage_Angle,
    EAI_Detection,
    Classification_Detection,
  } = useBackendAPI();

  const [uploadImage, setUploadImage] = useState(null);
  const [responseImage, setresponseImage] = useState(null);
  const [responseImage2, setresponseImage2] = useState(null);
  const [MaskImage, setMaskImage] = useState(null);
  const [Result, SetResult] = useState(null);
  const [onshow, setonshow] = useState(false);
  const [CropImage, SetCropImage] = useState(null);
  const [imgDimention, setimgDimention] = useState({
    height: 0,
    width: 0,
  });
  const [Pain, setPain] = useState("0");
  // const [discharge,setdischarge] = useState(null);
  const [Imageshow, setImageshow] = useState(false);
  const [instruction, setinstuction] = useState(false);
  const [showselect, setshowselect] = useState(false);
  const [selected, setSelected] = useState(3);
  const [showdraw, setshowdraw] = useState(false);

  const navigate = useNavigate();

  const BASE_URL = "http://127.0.0.1:5000/predictions";

  const [isLoading, setIsLoading] = useState(false);

  const SendData = async (CroppedImage, type) => {
    resetSetting();

    if (CroppedImage !== null) {
      SetCropImage(CroppedImage);
      setIsLoading(true);
      const data = { Image: CroppedImage };
      try {
        if (type === "Severity") {
          const response = await severity_Detection(data);
          SetResult(response);
          setresponseImage(response.result["pltImage"]);
          setMaskImage(response.result["maskImage"]);
          setIsLoading(false);
          navigate("/result", {
            state: {
              type: type,
            },
          });
        } else if (type === "Explainable") {
          const response = await EAI_Detection(data);
          console.log(response);
          SetResult(response);
          setresponseImage(response.resultex["image"]);
          setresponseImage2(response.resultex["img_str"]);
          setIsLoading(false);
          // navigate("/result", {
          //   state: {
          //     type: type,
          //   },
          // });
        } else {
          const response = await Classification_Detection(data);
          SetResult(response);
          setresponseImage(response.resulClassification["image"]);
          setIsLoading(false);
          navigate("/result", {
            state: {
              type: type,
            },
          });
        }
      } catch (ex) {}
    }
  };

  const SendData_angle = async (CroppedImage) => {
    resetSetting();

    if (CroppedImage !== null) {
      SetCropImage(CroppedImage);
      setIsLoading(true);
      const data = { Image: CroppedImage };

      try {
        const response = await preictimage_Angle(data);
        SetResult(response);
        setresponseImage(response.annotated_image);
        setIsLoading(false);
        navigate("/result");
      } catch (ex) {}
    }
  };

  const resetSetting = () => {
    setresponseImage(null);
    SetResult(null);
  };

  const value = {
    uploadImage,
    setUploadImage,
    responseImage,
    setresponseImage,
    Result,
    SetResult,
    onshow,
    setonshow,
    CropImage,
    SetCropImage,
    imgDimention,
    setimgDimention,
    Pain,
    setPain,
    Imageshow,
    setImageshow,
    instruction,
    setinstuction,
    showselect,
    setshowselect,
    selected,
    setSelected,
    SendData,
    resetSetting,
    isLoading,
    setIsLoading,
    showdraw,
    setshowdraw,
    SendData_angle,
    MaskImage,
    responseImage2,
    setresponseImage2,
    setMaskImage,
  };

  return (
    <SeverityContext.Provider value={value}>
      {children}
    </SeverityContext.Provider>
  );
}

export default SeverityContextProvider;
