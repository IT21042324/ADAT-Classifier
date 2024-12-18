import { Form } from "./Form";

export const Severity = () => {
  return (
    <div>
      <header
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="txt mb-3">
              {/* <p className="fs-5">Acne Expert V1.0</p> */}
              <p
                className="fs-5 fw-lighter"
                style={{
                  color: "#ffe6e6",
                }}
              >
                Precise Diagnosis of Acne Spread & Severity
              </p>
            </div>
          </div>
          <Form type={"Severity"} />
        </div>
      </header>
    </div>
  );
};
