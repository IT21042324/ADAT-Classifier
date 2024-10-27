import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import "./Crop.css";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useSeverityContext } from "../useHook/useSeverityContext";

function CropModel({ UpImage, type }) {
  const { onshow, setonshow, imgDimention, SendData } = useSeverityContext();

  const [show, setShow] = useState(onshow);

  const [image, setimage] = useState(null);
  const [resultIMG, setresultIMG] = useState(null);
  const [imagehight, setimagehight] = useState(0);

  // for cropping setting
  const [crop, setCrop] = useState({
    aspect: 1 / 1,
    unit: "%", // Can be 'px' or '%'
    width: 75,
    height: 75,
  });

  // handle the modal close
  const handleClose = () => {
    setShow(false);
    setonshow(false);
  };

  const GetImage = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // As Base64 string
    const base64Image = canvas.toDataURL("image/jpeg");

    setresultIMG(base64Image);
  };

  // for create image from pixel
  function GetImageOnLoad(image, crop) {
    if (image !== null && crop.height !== 0 && crop.width !== 0) {
      GetImage(image, crop);
    }
  }

  function GetCroppedImg() {
    if (image !== null && crop.height !== 0 && crop.width !== 0) {
      GetImage(image, crop);
    }
  }

  const onResult = () => {
    if (resultIMG) {
      handleClose();
      SendData(resultIMG, type);
    }

    // else {
    //   // console.log("Warning ",Warnning)
    //   setWarnning(true);
    //   // console.log("withoud cropping ",resultIMG)
    // }
  };

  const onImageLoaded = (image) => {
    setimage(image);
    const cp = {
      width: image.width * 0.75,
      height: image.width * 0.75,
      x: 0,
      y: 0,
      unit: "px",
      aspect: 1,
    };
    GetImageOnLoad(image, cp);
  };

  useEffect(() => {
    //set show on parent and child
    const handleShow = () => {
      setShow(true);
      setonshow(true);
    };
    handleShow();
  }, [setonshow, onshow]);

  useEffect(() => {
    const valiadteHight = () => {
      if (parseInt(imgDimention.height) <= 350) {
        setimagehight(imgDimention.height);
      } else {
        setimagehight(350);
      }
    };

    valiadteHight();
  }, [imagehight, imgDimention.height]);

  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClose}
        fullscreen={true}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header className="bg-white">
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="txt-white"
          >
            {/* <img src={logo} className="logo" alt="logo" /> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <Container className=" justify-content-center">
            <Row className="justify-content-center ">
              <Col
                xs={12}
                md={7}
                lg={8}
                className="justify-content-center align-items-center mt-2"
              >
                {UpImage && (
                  <div className="align-center">
                    <p
                      className="text-center fs-4 blue txt-white"
                      style={{ color: "#A1A1A1" }}
                    >
                      Original Image
                    </p>
                    <ReactCrop
                      src={UpImage}
                      onImageLoaded={onImageLoaded}
                      crop={crop}
                      onChange={(crop) => setCrop(crop)}
                      onComplete={GetCroppedImg}
                      className="rounded responsive-img bg-blue img-border"
                      style={{ height: imagehight, borderColor: "#FF8DA1" }}
                      keepSelection={true}
                      minHeight={imagehight / 2.5}
                      minWidth={imagehight / 2.5}
                      imageAlt={"Cropping Tool"}
                    />
                  </div>
                )}
              </Col>
              <Col s={12} md={5} lg={4} className="mt-2">
                {resultIMG != null ? (
                  <div className="preview-section">
                    <p
                      className="text-center fs-4 blue txt-white"
                      style={{ color: "#A1A1A1" }}
                    >
                      Preview
                    </p>
                    <img
                      src={resultIMG}
                      id="upload"
                      className="rounded cropimg img-border"
                      alt="Preview"
                      style={{ maxHeight: imagehight, borderColor: "#FF8DA1" }}
                    ></img>
                  </div>
                ) : (
                  <div className="mt-5 preview-box">
                    <p className="fs-4 blue preview-text">
                      Cropping required to get Preview
                    </p>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="bg-white">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="btn-pink"
            onClick={onResult}
            style={{ backgroundColor: "	#ff5588" }}
          >
            Generate Results
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CropModel;
