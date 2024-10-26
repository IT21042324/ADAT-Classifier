import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import useAuthContextProvider from "./components/context/useAuth";
import { ProtectedRoutes } from "./ProtectedRoutes";
import LoginSignup from "./components/LoginAndSignup/LoginSignup"; // Assuming you have a login/signup page

function App() {
  const { cookie } = useAuthContextProvider();

  return (
    <>
      <Routes>
        {/* Redirect the base path "/" based on the cookie */}
        <Route
          path="/"
          element={
            cookie ? (
              <Navigate to="/classify" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Login Route */}
        <Route
          path="/login"
          element={
            cookie ? <Navigate to="/classify" replace /> : <LoginSignup />
          }
        />

        {/* Protected Routes */}
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </>
  );
}

export default App;
