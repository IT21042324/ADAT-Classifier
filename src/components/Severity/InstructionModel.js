import "./InstructionModel.css";

import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import Carousel from "react-bootstrap/Carousel";

import ImgCrop from "./SVG Component/ImgCrop";
import ImgUpload from "./SVG Component/ImgUpload";
import ImgResult from "./SVG Component/ImgResult";
import ImgTake from "./SVG Component/ImgTake";

export function Instruction({ onshow, setWarnning }) {
  const [show, setShow] = useState(onshow);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleClose = () => {
    setWarnning(false);
    setShow(false);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClose}
        size="lg"
        // dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        // animation={true}
        centered
      >
        <Modal.Header className="bg-white">
          <CloseButton onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="bg-white body-high">
          <Container className=" justify-content-center">
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              variant="dark"
            >
              <Carousel.Item>
                <Row className="justify-content-center ">
                  <Col
                    s={12}
                    md={6}
                    lg={6}
                    className="justify-content-center align-items-center mt-2"
                  >
                    {/* <img src={ImgCrop} className="Image-size" alt="ImgUpload" /> */}
                    <ImgUpload />
                  </Col>
                  <Col
                    s={12}
                    md={6}
                    lg={6}
                    className="justify-content-center align-items-center mt-3"
                  >
                    <p className="fw-bold fs-4 pink"> Upload Image </p>
                    <ol className="fw-light fs-6 line-high">
                      <li>Select the Folder.</li>
                      <li>Choose the Image</li>
                      <li>Allow minimum 300 X 300 Pixels image.</li>
                      <li>Choose one image at a time.</li>
                    </ol>
                  </Col>
                </Row>
              </Carousel.Item>

              <Carousel.Item>
                <Row className="justify-content-center ">
                  <Col
                    s={12}
                    md={6}
                    lg={6}
                    className="justify-content-center align-items-center mt-2"
                  >
                    {/* <img src={ImgResult} className="Image-size" alt="Warnning" /> */}
                    <ImgTake />
                  </Col>
                  <Col
                    s={12}
                    md={6}
                    lg={6}
                    className="justify-content-center align-items-center mt-3"
                  >
                    <p className="fw-bold fs-4 pink"> Capture Image </p>
                    <ol class="fw-light fs-6 line-high">
                      <li>
                        Take the photo about 4 inches away from the problem
                        area.
                      </li>
                      <li>Center your symptom in the photo.</li>
                      <li>Make sure there is good lighting.</li>
                      <li>Ensure your photo isn't blurry.</li>
                    </ol>
                  </Col>
                </Row>
              </Carousel.Item>

              <Carousel.Item>
                <Row className="justify-content-center ">
                  <Col
                    s={12}
                    md={6}
                    lg={6}
                    className="justify-content-center align-items-center mt-2"
                  >
                    {/* <img src={ImgResult} className="Image-size" alt="Warnning" /> */}
                    <ImgCrop />
                  </Col>
                  <Col
                    s={12}
                    md={6}
                    lg={6}
                    className="justify-content-center align-items-center mt-3"
                  >
                    <p className="fw-bold fs-4 pink"> Crop Image </p>
                    <ol class="fw-light fs-6 line-high">
                      <li>Cropping Window is popup.</li>
                      <li>Crop only symptom area.</li>
                      <li>Cropped area is previewed at the right corner.</li>
                      <li>Click The Generate Result Button.</li>
                    </ol>
                  </Col>
                </Row>
              </Carousel.Item>

              <Carousel.Item>
                <Row className="justify-content-center ">
                  <Col
                    s={12}
                    md={6}
                    lg={6}
                    className="justify-content-center align-items-center mt-2"
                  >
                    {/* <img src={ImgUpload} className="Image-size" alt="Warnning" /> */}
                    <ImgResult />
                  </Col>
                  <Col
                    s={12}
                    md={6}
                    lg={6}
                    className="justify-content-center align-items-center mt-3"
                  >
                    <p className="fw-bold fs-4 pink"> Generate Result </p>
                    <ol class="fw-light fs-6 line-high">
                      <li>The result is Generated Based on Cropped area.</li>
                      <li>
                        The predicted Image is Present in the Right corner.
                      </li>
                      <li>Provide Predicted Class.</li>
                      <li>Provide Similarity Score.</li>
                      <li>Provide Condition As Result.</li>
                      <li>
                        Retry by click on <b>Recrop & Retry </b>button.
                      </li>
                    </ol>
                  </Col>
                </Row>
              </Carousel.Item>
            </Carousel>
          </Container>
        </Modal.Body>
        <Modal.Footer className="bg-white">
          <Button className="btn-pink" onClick={handleClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
