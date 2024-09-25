import React, { useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import { Toaster } from "react-hot-toast";
import VerifyPage from "./Pages/VerifyPage";
import ProfilePage from "./Pages/ProfilePage";
import NotFoundPage from "./Pages/NotFoundPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import ForgotPasswordConfirmationPage from "./Pages/ForgotPasswordConfirmation";
import AddInterests from "./Pages/AddInterests";
import LandingPage from "./Pages/LandingPage";
import VerifyUserViaLink from "./Pages/VerifyUserViaLink";
import ProtectedRoute from "./utils/ProtectedRoute";
import RedirectRoute from "./utils/RedirectRoute"

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add-interests" element={<AddInterests />} />
        </Route>

        <Route element={<RedirectRoute />}>
          <Route path="*" element={<Navigate to={"/Friendly-PAI"} />} />
          <Route path="/Friendly-PAI" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route
            path="/verify-user/:token/:otp"
            element={<VerifyUserViaLink />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/forgot-password-confirmation"
            element={<ForgotPasswordConfirmationPage />}
          />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
