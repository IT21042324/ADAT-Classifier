import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./components/context/Auth";
import SeverityContextProvider from "./components/context/SeverityContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SeverityContextProvider>
          <App />
        </SeverityContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
