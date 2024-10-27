import html2pdf from "html2pdf.js";
import { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row, Table } from "react-bootstrap";
import { FaFileDownload } from "react-icons/fa";
import { Mosaic } from "react-loading-indicators";
import { useLocation, useNavigate } from "react-router-dom";
import { useSeverityContext } from "../useHook/useSeverityContext";
import { BadgeCard } from "./Badge";
import "./Result.css";

const ResultPage = ({ handleClose, typeSetter }) => {
  const {
    Result,
    CropImage,
    responseImage,
    setshowdraw,
    MaskImage,
    responseImage2,
    setResponseImage2,
  } = useSeverityContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { type } = location?.state || {};
  const clinicalDiagnosis = Result.resultex["Clinical_diagnosis"];
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

  console.log("responseImageNow", responseImage);

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

  const downloadFullPageAsPDF = () => {
    // Get the current date and time
    const now = new Date();
    const dateTimeString = now.toLocaleString(); // Format as you prefer

    // Create a clone of the body to avoid capturing specific elements
    const pageClone = document.createElement("div");
    const pageElements = document.body.cloneNode(true);

    // Remove specific buttons by their class name
    const buttonsToRemove = pageElements.querySelectorAll(
      ".btn.btn-outline-pink, .btn.btn-primary"
    );
    buttonsToRemove.forEach((button) => button.remove());

    // Add date and time to the clone
    const header = document.createElement("div");
    header.style.textAlign = "right"; // Align to the right
    header.style.marginBottom = "10px"; // Space from content
    header.textContent = `Generated on: ${dateTimeString}`;

    // Append header and the modified body to the clone
    pageClone.appendChild(header);
    pageClone.appendChild(pageElements);

    const options = {
      margin: 0,
      filename: "AcneIntelliScan_Severity_Report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
    };

    html2pdf().from(pageClone).set(options).save();
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {typeSetter?.type === "Explainable" &&
          !Result?.result &&
          !responseImage && (
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
                <p style={{ color: "#A1A1A1" }}>
                  {Result?.result["Most Probable Diagnosis"]}
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            {/* <h3 className="Ai_Results_title">{"AI Analysis Details"}</h3> */}
            <div className="row  justify-content-center mb-2">
              {CropImage && (
                <div className="col-sm-12 col-lg-3 col-md-6 text-start mt-3 ">
                  <p
                    className="text-center fs-5 txt-black"
                    style={{ marginLeft: "-80px", color: "#A1A1A1" }}
                  >
                    Original Image
                  </p>
                  <img
                    src={CropImage}
                    style={{ marginLeft: "-50px" }}
                    id="upload"
                    className="rounded float-start image result"
                    alt="Original"
                  ></img>
                </div>
              )}

              {MaskImage && (
                <div className="col-sm-12 col-lg-3 col-md-6 text-start mt-3 ">
                  <p
                    className="text-center  fs-5 txt-black"
                    style={{ color: "#A1A1A1" }}
                  >
                    Response Image
                  </p>
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
                <h4 style={{ color: "#A1A1A1" }}>Diagnosis Results</h4>
                <Table striped bordered hover style={{ color: "#A1A1A1" }}>
                  <thead>
                    <tr>
                      <th style={{ color: "#A1A1A1" }}>Type</th>
                      <th style={{ color: "#A1A1A1" }}>Average Confidence</th>
                      <th style={{ color: "#A1A1A1" }}>Detection Count</th>
                      <th style={{ color: "#A1A1A1" }}>Max Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(Result?.result["Diagnos Set"]).map(
                      (key, index) => (
                        <tr
                          key={key}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#3e3e3e";
                            e.currentTarget.style.color = "#ffffff"; // Change text color on hover
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = ""; // Reset background color
                            e.currentTarget.style.color = "#A1A1A1"; // Reset text color
                          }}
                        >
                          <td style={{ color: "#A1A1A1" }}>{key}</td>
                          <td style={{ color: "#A1A1A1" }}>
                            {Result?.result["Diagnos Set"][
                              key
                            ].average_confidence.toFixed(2)}
                          </td>
                          <td style={{ color: "#A1A1A1" }}>
                            {Result?.result["Diagnos Set"][key].detection_count}
                          </td>
                          <td style={{ color: "#A1A1A1" }}>
                            {Result?.result["Diagnos Set"][
                              key
                            ].max_confidence.toFixed(2)}
                          </td>
                        </tr>
                      )
                    )}
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
                <h4 style={{ color: "#A1A1A1", marginTop: "20px" }}>
                  Recommendations
                </h4>
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
                <h4 style={{ color: "#A1A1A1", marginTop: "20px" }}>
                  Self-Treatment Options
                </h4>
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
            <h3 style={{ color: "#FFABB9" }}>Explanation</h3>

            <div className="row  justify-content-center mb-2">
              {CropImage && (
                <div className="col-sm-12 col-lg-3 col-md-6 text-start mt-3 ">
                  <p
                    className="text-center fs-5 txt-black"
                    style={{ color: "#A1A1A1" }}
                  >
                    Original Image
                  </p>
                  <img
                    src={CropImage}
                    id="upload"
                    style={{ borderColor: "#FFABB9" }}
                    className="rounded float-start image result"
                    alt="Original"
                  ></img>
                </div>
              )}

              {responseImage && (
                <div className="col-sm-12 col-lg-3 col-md-6 text-start mt-3 ">
                  <p
                    className="text-center  fs-5 txt-white"
                    style={{ color: "#A1A1A1" }}
                  >
                    Response Image
                  </p>
                  <img
                    src={"data:image/jpeg;base64," + responseImage}
                    id="upload"
                    className="rounded float-start image result"
                    alt="Response"
                  ></img>
                </div>
              )}
              {responseImage2 && (
                <div>
                  <div className="col-sm-12 col-lg-3 col-md-6 text-start mt-3 ">
                    <p
                      className="text-center  fs-5 txt-black"
                      style={{ color: "#A1A1A1" }}
                    >
                      Visual Saliency
                    </p>
                    <img
                      src={"data:image/jpeg;base64," + responseImage2}
                      id="upload"
                      // style={{ marginTop: "-10px" }}
                      className="rounded float-start image result"
                      alt="Response"
                    ></img>
                  </div>
                  {clinicalDiagnosis}
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

      {(Result?.result || responseImage) &&
        typeSetter?.type !== "Explainable" && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-6 my-3">
              <div className="Ml_result mb-5">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px", // space between buttons
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "50px", // space between buttons
                    }}
                  >
                    <button
                      className="btn btn-outline-pink"
                      onClick={(e) => handdleClick()}
                      style={{
                        backgroundColor: "#ccc",
                        color: "#333",
                        padding: "10px 30px",
                        border: "none",
                        borderRadius: "5px",
                        position: "relative",
                        cursor: "pointer",
                        fontSize: "20px",
                        fontWeight: "bold",
                        left: "50px",
                        transition: "background-color 0.3s, transform 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#aaa";
                        e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ccc"; // Reset background color
                        e.currentTarget.style.transform = "scale(1)"; // Reset size
                      }}
                    >
                      {"Try Again"}
                    </button>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end", // Aligns the button to the right
                        position: "relative",
                        left: "600px",
                      }}
                    >
                      <button
                        className="btn btn-primary"
                        onClick={downloadFullPageAsPDF}
                        style={{
                          backgroundColor: "#ccc",
                          color: "#333",
                          padding: "10px 20px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "16px",
                          transition: "background-color 0.3s, transform 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#aaa";
                          e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#ccc"; // Reset background color
                          e.currentTarget.style.transform = "scale(1)"; // Reset size
                        }}
                      >
                        <FaFileDownload size={30} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ResultPage;
