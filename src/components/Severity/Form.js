import "./Form.css";

import { useEffect } from "react";
import { useSeverityContext } from "../useHook/useSeverityContext";
import CropModel from "./CropModel";
import DrawingModel from "./drawingModel";
import { ImageModel } from "./ImageModel";
import { Mosaic } from "react-loading-indicators";

export function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

export function Form({ type }) {
  const {
    resetSetting,
    uploadImage,
    setUploadImage,
    onshow,
    setonshow,
    SetCropImage,
    imgDimention,
    setimgDimention,
    Imageshow,
    setImageshow,
    setinstuction,
    showdraw,
    isLoading,
  } = useSeverityContext();

  // validate the images
  const imgValidation = (imageURL) => {
    setonshow(false);
    setImageshow(false);
    let file, img;
    file = imageURL;
    if (file) {
      img = new Image();
      let objectUrl = URL.createObjectURL(file);
      img.onload = function () {
        setimgDimention({
          width: this.width,
          height: this.height,
        });

        if (this.width > 50 && this.height > 50) {
          setonshow(true);
          setImageshow(false);
        } else {
          setonshow(false);
          setImageshow(true);
        }

        URL.revokeObjectURL(objectUrl);
      };
      img.src = objectUrl;
    }
  };

  const imageChange = (e) => {
    setUploadImage(null);
    resetSetting();

    if (e.target.files && e.target.files.length > 0) {
      setUploadImage(e.target.files[0]);
      SetCropImage(null);
      imgValidation(e.target.files[0]);
      e.target.value = null;
    }
  };

  useEffect(() => {
    const delay = 1;
    let timer1 = setTimeout(() => setinstuction(true), delay * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-lg-8 col-md-6 align-item-center justify-content-center">
            {isLoading ? (
              <>
                {isLoading && (
                  <div
                    style={{
                      position: "absolute",
                      top: "48%",
                      left: "45%",
                    }}
                  >
                    <Mosaic color="#9fa49f" size="large" text="" textColor="" />
                  </div>
                )}
              </>
            ) : (
              <form>
                <div className="col-sm-12 col-lg-12 col-md-12 align-self-center">
                  <label
                    htmlFor="Image"
                    className="form-label jutify-content-start s-4"
                  >
                    Upload Your Image
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control z-1"
                      id="Image"
                      accept="image/*"
                      aria-describedby="basic-addon3"
                      onChange={imageChange}
                    />
                  </div>
                </div>

                {onshow && !Imageshow && !showdraw ? (
                  <CropModel
                    UpImage={URL.createObjectURL(uploadImage)}
                    type={type}
                  />
                ) : (
                  ""
                )}

                {onshow && !Imageshow && showdraw ? (
                  <DrawingModel UpImage={URL.createObjectURL(uploadImage)} />
                ) : (
                  ""
                )}

                {Imageshow && !onshow ? (
                  <ImageModel
                    ImageShow={Imageshow}
                    ImageDimention={imgDimention}
                  />
                ) : (
                  ""
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
