import { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { useSeverityContext } from "../useHook/useSeverityContext";
import "./Result.css";
import { BadgeCard } from "./Badge";

const ResultPage = () => {
  const { Result, CropImage, responseImage, setshowdraw, MaskImage } =
    useSeverityContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { type } = location.state;

  const [activeBadge, setActiveBadge] = useState({
    red: false,
    yellow: false,
    green: false,
    orange: false,
  });

  const [result, setResult] = useState(
    Result.cnn_result ? Result.overall_result : Result
  );
  const [Title, setTitle] = useState("Overall  Result");

  // let result =  Result.cnn_result?Result.cnn_result:Result
  // const {
  //   result: {
  //     Color,
  //     'Diagnos Set': diagnosSet,
  //     'Most Probable Diagnosis': mostProbableDiagnosis,
  //     Recommendations,
  //     'Self-Treatment Options': selfTreatmentOptions
  //   }
  // } = Result.result;
  const handdleClick = () => {
    setshowdraw(false);
    if (type === "Severity") {
      navigate("/severity");
    } else if (type === "Explainable") {
      navigate("/expainable");
    } else {
      navigate("/classification");
    }
  };

  // const handdleCNNClick = () => {
  //   if (Result.cnn_result) {
  //     // result = Result.cnn_result
  //     setResult(Result.cnn_result);
  //     changeActiveBadge(Result.result[]);
  //     setTitle("CNN Result");
  //   }
  // };

  const handdleIPClick = () => {
    console.log("IP Result", Result.ip_result);
    if (Result.ip_result) {
      // console.log("IP Result" ,Result.ip_result);
      setResult(Result.ip_result);
      changeActiveBadge(Result.ip_result.Risk);
      // result = Result.ip_result
      setTitle("Image Processing Result");
    }
  };
  //   {
  //     "predicted_label": "Clubbing",
  //     "confidence_score": 93.66,
  //     "Risk": "High",
  //     "Type": "CNN_IP",
  //     "detail": "Based on Nail scan image proccessing approach has detected Clubbing on your nail, indicating an underlying issue. It is essential for you to seek medical attention promptly. We understand that this news may be unsettling, but we want to assure you that these conditions can be effectively addressed and managed. "
  // }
  const handdleCVClick = () => {
    console.log("CV Result", Result.overall_resul);
    if (Result.overall_result) {
      // console.log("IP Result" ,Result.ip_result);
      setResult(Result.overall_result);
      changeActiveBadge(Result.overall_result.Risk);
      // result = Result.ip_result
      setTitle("Overall Result");
    }
  };

  const handdleDrawClick = () => {
    navigate("/home");
    setshowdraw(true);
  };
  const changeActiveBadge = (color) => {
    console.log(color);
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

  // useEffect(() => {
  //   const res = verifyuser();
  //   console.log(res);
  //   if (!res) {
  //     navigate("login");
  //   }
  // }, []);

  useEffect(() => {
    if (Result.result != null) {
      changeActiveBadge(Result.result["severity"]);
    }
  }, [Result]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {/* {Result.result && (
          <h1 className="fs-3 text-center pt-3 pb-3 txt-black">{Title}</h1>
        )} */}

        {Result.result && (
          <>
            <div className="row justify-content-center align-item-center">
              {/* <div className="col-4 col-md-4 col-lg-4 my-3 align-item-end justify-content-end">
                <div className="Ml_result mb-5">
                  <button
                    className="btn btn-pink"
                    onClick={(e) => handdleCNNClick()}
                  >
                    {"Get CNN Model Result"}
                  </button>
                </div>
              </div> */}

              {/* <div className="col-4 col-md-4 col-lg-4 my-3 align-item-start justify-content-start">
                <div className="Ml_result mb-5">
                  <button
                    className="btn btn-pink"
                    onClick={(e) => handdleCVClick()}
                  >
                    {"Get Overall Result"}
                  </button>
                </div>
              </div> */}

              {/* <div className="col-4 col-md-4 col-lg-4 my-3 align-item-start justify-content-start">
                <div className="Ml_result mb-5">
                  <button
                    className="btn btn-pink"
                    onClick={(e) => handdleIPClick()}
                  >
                    {"Get Image Processing Result"}
                  </button>
                </div>
              </div> */}
            </div>

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
      {Result.result && (
        <>
          <div className="row justify-content-center mt-4">
            <div className="col-sm-12 col-lg-6 col-md-6 align-item-center justify-content-center">
              <div className="result_txt">
                {/* <h3>{"AI Analysis Result"}</h3> */}
                <p>{Result.result["Most Probable Diagnosis"]}</p>
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
                    {Object.keys(Result.result["Diagnos Set"]).map((key) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>
                          {Result.result["Diagnos Set"][
                            key
                          ].average_confidence.toFixed(2)}
                        </td>
                        <td>
                          {Result.result["Diagnos Set"][key].detection_count}
                        </td>
                        <td>
                          {Result.result["Diagnos Set"][
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
                      {Result.result["Overall Explanation"]}
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
                  {Result.result["Recommendations"].length > 0 ? (
                    Result.result["Recommendations"].map((rec, index) => (
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
                  {Result.result["Self-Treatment Options"].map(
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

      {Result.resultex && (
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
              <thead>
                {/* <tr>
            <th>Field</th>
            <th>Value</th>
          </tr> */}
              </thead>
              <tbody>
                <tr>
                  <td>First Predicted Class</td>
                  <td>{Result.resultex.First_Predicted_Class}</td>
                </tr>
                <tr>
                  <td>Second Predicted Class</td>
                  <td>{Result.resultex.second_predicted_class || "N/A"}</td>
                </tr>
                <tr>
                  <td>Third Predicted Class</td>
                  <td>{Result.resultex.third_predicted_class || "N/A"}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </>
      )}

      {Result.resulClassification && (
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
              <thead>
                {/* <tr>
            <th>Field</th>
            <th>Value</th>
          </tr> */}
              </thead>
              <tbody>
                <tr>
                  <td>First Predicted Class</td>
                  <td>{Result.resulClassification.First_Predicted_Class}</td>
                </tr>
                <tr>
                  <td>Second Predicted Class</td>
                  <td>
                    {Result.resulClassification.second_predicted_class || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td>Third Predicted Class</td>
                  <td>
                    {Result.resulClassification.third_predicted_class || "N/A"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </>
      )}

      {/* <div className="row justify-content-center">
        <div className="col-sm-12 col-md-6 col-lg-6 my-3">
          <div className="Ai_Results">
            <h3 className="Ai_Results_title mt-5">
              {"Computer Vision Result"}
            </h3>
            <div className="Ai_Results_box">
              <div className="Ai_Results_box_item">
                {result.predicted_label && (
                  <>
                    <h3>{"Predicted Class"}</h3>
                    <h3>{result.predicted_label}</h3>
                  </>
                )}
                {result.condition && (
                  <>
                    <h3>{"Condition"}</h3>
                    <h3>{result.condition}</h3>
                  </>
                )}
              </div>
              <div className="Ai_Results_box_item">
                {result.confidence_score && (
                  <>
                    <h3>{"Confident level"}</h3>
                    <h3>{result.confidence_score + " %" || result.angle}</h3>
                  </>
                )}

                {result.angle && (
                  <>
                    <h3>{"Angle level"}</h3>
                    <h3>{result.angle}</h3>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="row justify-content-center">
        <div className="col-sm-12  col-md-6 col-lg-6 my-3">
          <div className="Ai_Results">
            <h3 className="Ai_Results_title">{"Explanation"}</h3>

            {result.detail ? (
              <div className="result_txt">
                <p>{result.detail}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div> */}
      {/* 
      {Result.cnn_result && (
        <>
          <div className="row justify-content-center mt-4">
            <div className="col-sm-12 col-lg-6 col-md-6 align-item-center justify-content-center">
              <div className="result_txt">
                <p>
                  The overall result prediction is generated using our two main
                  AI functions. You can view the results of each function
                  through the following links:
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center align-item-center">
            <div className="col-4 col-md-4 col-lg-3">
              <div className="Ml_result ">
                <button
                  className="btn text-center text-primary"
                  onClick={(e) => handdleCNNClick()}
                >
                  {"Get CNN Model Result"}
                </button>
              </div>
            </div>

            <div className="col-4 col-md-4 col-lg-3 ">
              <div className="Ml_result ">
                <button
                  className="btn text-center text-primary"
                  onClick={(e) => handdleIPClick()}
                >
                  {"Get Image Processing Result"}
                </button>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-sm-12 col-lg-6 col-md-6 align-item-center justify-content-center">
              <div className="result_txt">
                <p>
                     Feel free to explore the predictions made by our AI functions for a comprehensive insight into the outcome.
                </p>
              </div>
            </div>
          </div>
        </>
      )} */}

      {/* {Result.cnn_result && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-6 my-3">
            <div className="Ml_result mb-2">
              <button
                className="btn btn-pink"
                onClick={(e) => handdleDrawClick()}
              >
                {"Try Angle Wise Analysis"}
              </button>
            </div>
          </div>
        </div>
      )} */}

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
      {/* {result.predicted_label && result.predicted_label !== "Normal" && (
        <Desc pred_class={result.predicted_label} />
      )} */}
    </div>
  );
};

export default ResultPage;
