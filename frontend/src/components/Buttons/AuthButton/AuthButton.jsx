import React from "react";
import "./AuthButton.css";
const AuthButton = ({ title, path }) => {
  return (
    <button type="submit" className="login-button">
      <span className="login-button-span">{title}</span>
    </button>
  );
};

export default AuthButton;
