import React from "react";
import "./InputField.css";
const InputField = ({ label, placeholder, onChange, error }) => {
  return (
    <div className="input-field-input">
      <span className={`input-label ${error ? "input-label-error-span" : ""} `}>
        {label}
      </span>
      <div
        className={`input-input ${error ? "input-label-error-border" : ""} `}
      >
        <input
          placeholder={placeholder}
          onChange={onChange}
          className="input-input-text"
        ></input>
      </div>
    </div>
  );
};

export default InputField;
