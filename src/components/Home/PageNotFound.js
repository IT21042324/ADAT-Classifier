import React from "react";
import { MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./error.css"; // Import the custom CSS file

export const PageNotFound = () => {
  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="forbidden-container">
      <div className="forbidden-content">
        <h1 className="forbidden-status">404</h1>
        <h2 className="forbidden-title">Oops! Page Not Found</h2>
        <p className="forbidden-description">
          {/* The page you're trying to access does not exist. */}
        </p>

        <div
          className="forbidden-button"
          role="button"
          tabIndex={0}
          onClick={navigateToHomePage}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigateToHomePage();
            }
          }}
        >
          Go to Home Page
          <MdHome size={20} />
        </div>
      </div>
    </div>
  );
};
