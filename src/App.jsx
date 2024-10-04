import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import toast, { Toaster } from "react-hot-toast";
import VerifyPage from "./Pages/VerifyPage";
import ProfilePage from "./Pages/ProfilePage";
// import NotFoundPage from "./Pages/NotFoundPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import ForgotPasswordConfirmationPage from "./Pages/ForgotPasswordConfirmation";
import AddInterests from "./Pages/AddInterests";
import LandingPage from "./Pages/LandingPage";
import VerifyUserViaLink from "./Pages/VerifyUserViaLink";
import ProtectedRoute from "./utils/ProtectedRoute";
import RedirectRoute from "./utils/RedirectRoute";
import { serverConnectedMessages } from "./utils/DataLists";

const App = () => {
  const [toastId, setToastId] = useState(null);

  const socket = io(import.meta.env.VITE_SERVER, {
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 2000,
  });

  useEffect(() => {
     // Handle connection success
     socket.on("connect", () => {
      if (toastId) {
        toast.dismiss(toastId);
        setToastId(null);
      }
    });

    socket.on("disconnect", () => {
      if (!toastId) {
        const id = toast.loading("Connecting to the server...");
        setToastId(id);
      }
    });

    // Handle reconnection attempts and success
    socket.io.on("reconnect", () => {
      if (toastId) {
        toast.dismiss(); // Dismiss loading toast
        setToastId(null);
      }

      toast.success(serverConnectedMessages[Math.floor(Math.random()*serverConnectedMessages.length)]);
    });

    // Cleanup: disconnect the socket on component unmount
    return () => {
      socket.disconnect();
    };
  }, [toastId])
  
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
