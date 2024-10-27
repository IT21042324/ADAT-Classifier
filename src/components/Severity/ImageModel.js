import "./ImageModel.css";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";

import imageerr from "./Image.svg";

export function ImageModel({ ImageShow, ImageDimention }) {
  const [show, setShow] = useState(ImageShow);

  const handleClose = () => {
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
        centered
      >
        <Modal.Header className="bg-white">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="txt-white"
          ></Modal.Title>
          <CloseButton onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="bg-white">
          <Container className=" justify-content-center">
            <Row className="justify-content-center ">
              <Col
                s={12}
                md={6}
                lg={6}
                className="justify-content-center align-items-center mt-2"
              >
                <img
                  src={imageerr}
                  className="Image-size"
                  alt="Size Not sufficient"
                />
              </Col>
              <Col
                s={12}
                md={6}
                lg={6}
                className="justify-content-center align-items-center  mt-3"
              >
                <p className="fw-bold fs-4 blue">
                  {" "}
                  Oops! Something went wrong{" "}
                </p>
                <p className="fw-light fs-6">
                  {" "}
                  It looks like the photo is too small.{" "}
                </p>
                <p className="fw-light fs-6">
                  {" "}
                  Minimum photo size is 300 x 300 pixels.{" "}
                </p>
                <p className="fw-light fs-6">
                  {" "}
                  Your photo size is {ImageDimention.width} x{" "}
                  {ImageDimention.height} pixels.{" "}
                </p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="bg-white">
          <Button variant="primary" onClick={handleClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
