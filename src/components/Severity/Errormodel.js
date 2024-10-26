import "./InstructionModel.css"

import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import React, { useState} from "react";
import CloseButton from 'react-bootstrap/CloseButton';
import Warnning from './Warnning.svg'

export function ErrorModel({onshow,setWarnning})
{
    const [show, setShow] = useState(onshow);

    const handleClose = () => {
        setWarnning(false)
        setShow(false);
      
      };
    return (
        <>
        
          <Modal
            show={show}
            onHide={() => handleClose}
            size="md"
            // dialogClassName="modal-90w"
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            // animation={true}
            centered
          >
            <Modal.Header className="bg-white">
              <Modal.Title id="contained-modal-title-vcenter" className="red">
               Something Wrong !
              </Modal.Title>
              <CloseButton  onClick={handleClose}/>
            </Modal.Header>
            <Modal.Body className="bg-white">
              <Container className=" justify-content-center">
                <Row className="justify-content-center ">
                  <Col s={12} md={6} lg={6} className="justify-content-center align-items-center mt-2">
                    <img src={Warnning} className="Image-size" alt="Warnning" />
                  </Col>
                  <Col s={12} md={6} lg={6} className="justify-content-center align-items-center mt-3" >
                   <p className="fw-bold fs-4 red"> Oops! </p>
                   <p className="fw-light fs-6"> You Can't Generate Result Without Cropping.</p>
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