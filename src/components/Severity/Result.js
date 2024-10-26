import { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { useSeverityContext } from "../useHook/useSeverityContext";
import { BadgeCard } from "./Badge";
import "./Result.css";

const ResultPage = ({ handleClose }) => {
  const { Result, CropImage, responseImage, setshowdraw, MaskImage } =
    useSeverityContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { type } = location?.state || {};

  const [activeBadge, setActiveBadge] = useState({
    red: false,
    yellow: false,
    green: false,
    orange: false,
  });

  const handdleClick = () => {
    setshowdraw(false);
    if (type === "Severity") navigate("/severity");
    else handleClose();
  };

  const changeActiveBadge = (color) => {
    if (color === "Extremely Severe") {
      setActiveBadge({ red: true, yellow: false, green: false, orange: false });
    } else if (color === "Severe") {
      setActiveBadge({ red: false, yellow: false, green: false, orange: true });
    } else if (color === "Moderate") {
      setActiveBadge({ red: false, yellow: true, green: false, orange: false });
    } else {
      setActiveBadge({ red: false, yellow: false, green: true, orange: false });
    }
  };

  useEffect(() => {
    if (Result?.result != null) {
      changeActiveBadge(Result?.result["severity"]);
    }
  }, [Result]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {Result?.result && (
          <>
            <div className="row justify-content-center align-item-center"></div>

            <div className="col-sm-12 col-lg-5 col-md-6 align-item-center justify-content-center">
              <div>
                <p className="fs-4 text-center txt-black">
                  Acne Severity level is
                </p>
                <BadgeCard activeBadge={activeBadge} />
              </div>
            </div>
          </>
        )}
      </div>
      {Result?.result && (
        <>
          <div className="row justify-content-center mt-4">
            <div className="col-sm-12 col-lg-6 col-md-6 align-item-center justify-content-center">
              <div className="result_txt">
                {/* <h3>{"AI Analysis Result"}</h3> */}
                <p>{Result?.result["Most Probable Diagnosis"]}</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            {/* <h3 className="Ai_Results_title">{"AI Analysis Details"}</h3> */}
            <div className="row  justify-content-center mb-2">
              {CropImage && (
                <div className="col-sm-12 col-lg-3 col-md-6 text-start mt-3 ">
                  <p className="text-center fs-5 txt-black">Original Image</p>
                  <img
                    src={CropImage}
                    id="upload"
                    className="rounded float-start image result"
                    alt="Original"
                  ></img>
                </div>
              )}

              {responseImage && (
                <div className="col-sm-12 col-lg-3 col-md-6 text-start mt-3 ">
                  <p className="text-center  fs-5 txt-black">Response Image</p>
                  <img
                    src={"data:image/jpeg;base64," + responseImage}
                    id="upload"
                    className="rounded float-start image result"
                    alt="Response"
                  ></img>
                </div>
              )}

              {MaskImage && (
                <div className="col-sm-12 col-lg-3 col-md-6 text-start mt-3 ">
                  <p className="text-center  fs-5 txt-black">Response Image</p>
                  <img
                    src={"data:image/jpeg;base64," + MaskImage}
                    id="upload"
                    className="rounded float-start image result"
                    alt="Response"
                  ></img>
                </div>
              )}
            </div>
          </div>

          <Container>
            <Row>
              {/* Diagnos Set as a Table */}
              <Col md={6}>
                <h4>Diagnosis Results</h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Average Confidence</th>
                      <th>Detection Count</th>
                      <th>Max Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(Result?.result["Diagnos Set"]).map((key) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>
                          {Result?.result["Diagnos Set"][
                            key
                          ].average_confidence.toFixed(2)}
                        </td>
                        <td>
                          {Result?.result["Diagnos Set"][key].detection_count}
                        </td>
                        <td>
                          {Result?.result["Diagnos Set"][
                            key
                          ].max_confidence.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>

              {/* Most Probable Diagnosis as a Card */}
              <Col md={6}>
                <Card
                  style={{
                    marginTop: "40px", // Adds space above the Card
                    marginBottom: "20px",
                    backgroundColor: "#2b2424",
                    color: "#A1A1A1",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Clinical Diagnosis</Card.Title>
                    <Card.Text>
                      {Result?.result["Overall Explanation"]}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              {/* Recommendations as a List */}
              <Col md={6}>
                <h4 style={{ color: "#A1A1A1" }}>Recommendations</h4>
                <ListGroup>
                  {Result?.result["Recommendations"].length > 0 ? (
                    Result?.result["Recommendations"].map((rec, index) => (
                      <ListGroup.Item
                        style={{
                          backgroundColor: "#2b2424",
                          color: "#A1A1A1",
                        }}
                        key={index}
                      >
                        {rec}
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item>
                      No Recommendations Available
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Col>

              {/* Self-Treatment Options as a List */}
              <Col md={6}>
                <h4 style={{ color: "#A1A1A1" }}>Self-Treatment Options</h4>
                <ListGroup>
                  {Result?.result["Self-Treatment Options"].map(
                    (option, index) => (
                      <ListGroup.Item
                        style={{
                          backgroundColor: "#2b2424",
                          color: "#A1A1A1",
                        }}
                        key={index}
                      >
                        {option}
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </>
      )}

      {Result?.resultex && (
        <>
          <div className="container mt-4">
            <h3>Explanation</h3>

            <div className="row  justify-content-center mb-2">
              {CropImage && (
                <div className="col-sm-12 col-lg-3 col-md-6 text-start mt-3 ">
                  <p className="text-center fs-5 txt-black">Original Image</p>
                  <img
                    src={CropImage}
                    id="upload"
                    className="rounded float-start image result"
                    alt="Original"
                  ></img>
                </div>
              )}

              {responseImage && (
                <div className="col-sm-12 col-lg-3 col-md-6 text-start mt-3 ">
                  <p className="text-center  fs-5 txt-white">Response Image</p>
                  <img
                    src={"data:image/jpeg;base64," + responseImage}
                    id="upload"
                    className="rounded float-start image result"
                    alt="Response"
                  ></img>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {Result?.resulClassification && (
        <>
          <div className="container mt-4">
            <h3>Prediction Result</h3>

            <div className="row  justify-content-center mb-2">
              {CropImage && (
                <div className="col-sm-12 col-lg-3 col-md-6 text-start mt-3 ">
                  <p className="text-center fs-5 txt-black">Original Image</p>
                  <img
                    src={CropImage}
                    id="upload"
                    className="rounded float-start image result"
                    alt="Original"
                  ></img>
                </div>
              )}

              {responseImage && (
                <div className="col-sm-12 col-lg-3 col-md-6 text-start mt-3 ">
                  <p className="text-center  fs-5 txt-black">Response Image</p>
                  <img
                    src={"data:image/jpeg;base64," + responseImage}
                    id="upload"
                    className="rounded float-start image result"
                    alt="Response"
                  ></img>
                </div>
              )}
            </div>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>First Predicted Class</td>
                  <td>{Result?.resulClassification.First_Predicted_Class}</td>
                </tr>
                <tr>
                  <td>Second Predicted Class</td>
                  <td>
                    {Result?.resulClassification.second_predicted_class ||
                      "N/A"}
                  </td>
                </tr>
                <tr>
                  <td>Third Predicted Class</td>
                  <td>
                    {Result?.resulClassification.third_predicted_class || "N/A"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </>
      )}

      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-6 my-3">
          <div className="Ml_result mb-5">
            <button
              className="btn btn-outline-pink"
              onClick={(e) => handdleClick()}
            >
              {"Try Again"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
