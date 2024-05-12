import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import TaskPage from "./pages/TaskPage/TaskPage";
import RequestPasswordResetPage from "./pages/ForgotPasswordPages/RequestPasswordResetPage/RequestPasswordResetPage";
import VerifyResetCodePage from "./pages/ForgotPasswordPages/VerifyResetCodePage/VerifyResetCodePage";
import ResetPasswordPage from "./pages/ForgotPasswordPages/ResetPasswordPage/ResetPasswordPage";
import SixDigitInput from "./components/CodePin/SixDigitInput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TaskPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/request-reset-password"
            element={<RequestPasswordResetPage />}
          />
          <Route
            path="/verify-reset-password/:email"
            element={<VerifyResetCodePage />}
          />
          <Route
            path="/reset-password/:email/:code"
            element={<ResetPasswordPage />}
          />
          <Route path="/code-pin" element={<SixDigitInput></SixDigitInput>} />
        </Routes>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default App;
