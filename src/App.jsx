import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import { Toaster } from "react-hot-toast";
import VerifyPage from "./Pages/VerifyPage";
import ProfilePage from "./Pages/ProfilePage";
import { motion } from "framer-motion";
import NotFoundPage from "./Pages/NotFoundPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import ForgotPasswordConfirmationPage from "./Pages/ForgotPasswordConfirmation";
import AddInterests from "./Pages/AddInterests";
import LandingPage from "./Pages/LandingPage";
import { AuthStore } from "./Stores/AuthStore";
import LoadingSpinner from "./components/LoadingSpinner";
import VerifyUserViaLink from "./Pages/VerifyUserViaLink";

const ProtectedRoute = ({ children }) => {
  const { isVerified, isAuthorized } = AuthStore();
  if (!isAuthorized) return <Navigate to={"/Friendly-PAI"} replace />;
  if (!isVerified) return <Navigate to={"/verify"} replace />;
  return children;
};

const RedirectRoute = ( {children} ) => {
  const { isVerified, isAuthorized } = AuthStore();
  if (isAuthorized && isVerified) return <Navigate to={"/"} />;
  return children
};

const App = () => {
  const { isCheckingAuth, AuthorizationCheck } = AuthStore();
  useEffect(() => {
    AuthorizationCheck();
  }, [AuthorizationCheck]);

  if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/"
          element={
            // <ProtectedRoute>
              <Home />
            // </ProtectedRoute>
          }
        />
        <Route path="/Friendly-PAI" element={<LandingPage />} />
        <Route
          path="/signup"
          element={
            // <RedirectRoute>
              <SignUpPage />
            // </RedirectRoute>
          }
        />
        <Route
          path="/verify"
          element={
            // <RedirectRoute>
              <VerifyPage />
            // </RedirectRoute>
          }
        />
        {/* <Route
          path="/verify-user/:token/:otp"
          element={
            <RedirectRoute>
              <VerifyUserViaLink />
            </RedirectRoute>
          }
        /> */}
        <Route
          path="/login"
          element={
            // <RedirectRoute>
              <LoginPage />
            // </RedirectRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            // <RedirectRoute>
              <ForgotPasswordPage />
            // </RedirectRoute>
          }
        />
        <Route
          path="/forgot-password-confirmation"
          element={
            // <RedirectRoute>
              <ForgotPasswordConfirmationPage />
            // </RedirectRoute>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            // <RedirectRoute>
              <ResetPasswordPage />
            // </RedirectRoute>
          }
        />
        <Route
          path="/profile"
          element={
            // <ProtectedRoute>
              <ProfilePage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/add-interests"
          element={
            // <ProtectedRoute>
              <AddInterests />
            // </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
