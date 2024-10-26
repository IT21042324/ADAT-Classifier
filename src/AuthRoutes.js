import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginSignup from "./components/LoginAndSignup/LoginSignup";
import useAuthContextProvider from "./components/context/useAuth";
import { PageNotFound } from "./components/Home/PageNotFound";

export function AuthRoutes() {
  const { cookie } = useAuthContextProvider();

  return (
    <Routes>
      {/* Default Redirect to Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login and Signup Route */}
      <Route
        path="/login"
        element={cookie ? <Navigate to="/classify" replace /> : <LoginSignup />}
      />

      {/* 404 - Page Not Found Route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
