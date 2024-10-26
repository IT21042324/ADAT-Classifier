import ResultPage from "../Severity/Result";

export const Explainable = ({ handleClose }) => {
  return (
    <header
      className="App-header"
      style={{
        background: "#150909c7",
        color: "white",
      }}
    >
      <ResultPage handleClose={handleClose} />
    </header>
  );
};
