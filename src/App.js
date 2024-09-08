import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./components/Home/Home";
import LoginSignup from "./components/LoginAndSignup/LoginSignup";
import useAuthContextProvider from "./components/context/useAuth";

function App() {
  const { cookie } = useAuthContextProvider(); // Get authentication state from AuthContext
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default Redirect to Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Login and Signup Route */}
          <Route
            path="/login"
            element={
              cookie ? <Navigate to="/classify" replace /> : <LoginSignup />
            }
          />

          {/* Protected Route */}
          <Route
            path="/classify"
            element={cookie ? <Home /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
