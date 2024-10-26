import React, { createRef, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import "./drawing.css";

import { ReactSketchCanvas } from "react-sketch-canvas";
import { useSeverityContext } from "../useHook/useSeverityContext";

function DrawingModel({ UpImage }) {
  const { onshow, setonshow, imgDimention, SendData_angle } =
    useSeverityContext();

  const [show, setShow] = useState(onshow);

  const [image, setimage] = useState(null);
  const [resultIMG, setresultIMG] = useState(null);
  const [imagehight, setimagehight] = useState(0);

  const [grayscaleUrl, setGrayscaleUrl] = useState(null);
  const drawingRef = createRef();

  const handleClose = () => {
    setShow(false);
    setonshow(false);
  };

  const handleComplete = () => {
    drawingRef.current
      .exportImage("png")
      .then((data) => {
        setresultIMG(data);

        // console.log("export",data);
        if (data) {
          handleClose();
          SendData_angle(data);
        }
        console.log("export", data);
      })
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    drawingRef.current.resetCanvas();
  };
  const handleClear = () => {
    drawingRef.current.clearCanvas();
  };

  const handleUndo = () => {
    drawingRef.current.undo();
  };

  const handleRedo = () => {
    drawingRef.current.redo();
  };

  useEffect(() => {
    // Load the original image
    const img = new Image();
    img.onload = () => {
      // Convert to grayscale once the image is loaded
      const grayscaleImgUrl = rgbToGrayscale(img);
      setGrayscaleUrl(grayscaleImgUrl);
    };
    img.onerror = () => {
      console.error("Failed to load the original image.");
    };
    img.src = UpImage;
  }, [UpImage]);

  // I am using this to refer to the canvas element as I cannot use querySelector in React.

  const rgbToGrayscale = (img) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const width = img.width;
    const height = img.height;

    // Set canvas dimensions to the same as the image
    canvas.width = width;
    canvas.height = height;

    // Draw the image on the canvas
    ctx.drawImage(img, 0, 0, width, height);

    // Get the image data from the canvas
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Convert each pixel to grayscale
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }

    // Put the grayscale data back to the canvas
    ctx.putImageData(imageData, 0, 0);

    // Return the grayscale image URL
    return canvas.toDataURL();
  };

  useEffect(() => {
    if (UpImage) {
      console.log("UpImage", String(UpImage));
      setimage(UpImage);
      setimagehight(imgDimention.height);
    }
  }, [UpImage]);

  const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
  };

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
                xs={8}
                md={8}
                lg={10}
                className="justify-content-center align-items-center mt-2"
              >
                {UpImage && (
                  <div className="align-center justify-content-center align-items-center d-flex flex-column">
                    <p className="text-center fs-4 pink txt-white">Image</p>
                    <ReactSketchCanvas
                      ref={drawingRef}
                      style={styles}
                      width={600}
                      height={400}
                      strokeWidth={20}
                      strokeColor="#a3fe34"
                      backgroundImage={grayscaleUrl}
                      exportWithBackgroundImage={true}
                    />
                  </div>
                )}
              </Col>
              <Col
                s={4}
                md={4}
                lg={2}
                className="mt-2 align-items-center justify-content-center  d-flex flex-column"
              >
                <div class="d-grid gap-2 col-6 mx-auto">
                  <button
                    class="btn btn-outline-pink"
                    type="button"
                    onClick={handleClear}
                  >
                    Erase all
                  </button>

                  <button
                    class="btn btn-outline-pink"
                    type="button"
                    onClick={handleReset}
                  >
                    Reset
                  </button>

                  <button
                    class="btn btn-outline-pink"
                    type="button"
                    onClick={handleUndo}
                  >
                    Undo
                  </button>

                  <button
                    class="btn btn-outline-pink"
                    type="button"
                    onClick={handleRedo}
                  >
                    Redo
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="bg-white">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn-pink" onClick={handleComplete}>
            Generate Results
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DrawingModel;
