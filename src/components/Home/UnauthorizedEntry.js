import React from "react";
import { MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./error.css"; // Import the custom CSS file

export const UnauthorizedEntry = () => {
  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="forbidden-container">
      <div className="forbidden-content">
        <h1 className="forbidden-status">403</h1>
        <h2 className="forbidden-title">Access Denied!</h2>
        <p className="forbidden-description">
          {/* You do not have permissions to view this page. */}
        </p>

        <div className="forbidden-button" onClick={navigateToHomePage}>
          Home Page
          <MdHome size={20} />
        </div>
      </div>
    </div>
  );
};
