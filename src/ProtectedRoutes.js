import React from "react";
import { Route, Routes } from "react-router-dom";
import useAuthContextProvider from "./components/context/useAuth";
import { Header } from "./components/header/Header";
import Home from "./components/Home/Home";
import { PageNotFound } from "./components/Home/PageNotFound";
import { UnauthorizedEntry } from "./components/Home/UnauthorizedEntry"; // Import Unauthorized component
import { Synth } from "./components/Synth/Synth";

export function ProtectedRoutes() {
  const { cookie } = useAuthContextProvider();

  return (
    <>
      {/* Header outside Routes so it shows on all pages */}
      {cookie && <Header />}

      <Routes>
        {/* Protected Route for /classify */}
        <Route
          path="/classify"
          element={
            cookie ? (
              <Home />
            ) : (
              <UnauthorizedEntry />
            ) /* Show Unauthorized if no cookie */
          }
        />

        {/* Protected Route for /synth */}
        <Route
          path="/synth"
          element={
            cookie ? (
              <Synth />
            ) : (
              <UnauthorizedEntry />
            ) /* Show Unauthorized if no cookie */
          }
        />

        {/* Catch-all for undefined paths */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
