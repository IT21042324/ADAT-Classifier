import ResultPage from "../Severity/Result";

export const Explainable = ({ handleClose }) => {
  const typeSetter = { type: "Explainable" };

  return (
    <header
      className="App-header"
      style={{
        background: "#150909c7",
        color: "white",
      }}
    >
      <ResultPage handleClose={handleClose} typeSetter={typeSetter} />
    </header>
  );
};
