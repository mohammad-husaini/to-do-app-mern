import React, { useState } from "react";
import "./SixDigitInput.css";
const SixDigitInput = ({ setPin }) => {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, event) => {
    const { value } = event.target;
    if (value.length === 1 && /^\d$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);
      if (index < 5) {
        document.getElementById(`digit-${index + 1}`).focus();
      } else if (index === 5) {
        setPin(newDigits.join(""));
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      const newDigits = [...digits];
      newDigits[index] = "";
      setDigits(newDigits);
      if (index > 0) {
        document.getElementById(`digit-${index - 1}`).focus();
      }
    } else if (event.key === "Delete") {
      const newDigits = [...digits];
      newDigits[index] = "";
      setDigits(newDigits);
    } else if (
      (event.key === "ArrowRight" || event.key === "ArrowLeft") &&
      index >= 0 &&
      index <= 5
    ) {
      const nextIndex = event.key === "ArrowRight" ? index + 1 : index - 1;
      const nextInputField = document.getElementById(`digit-${nextIndex}`);
      if (nextInputField) {
        nextInputField.focus();
      }
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text/plain");
    if (/^\d{6}$/.test(pasteData)) {
      const newDigits = pasteData.split("");
      setDigits(newDigits);
      document.getElementById(`digit-5`).focus();
      setPin(newDigits.join(""));
    }
  };

  return (
    <div className="verify-reset-input-box-inputs">
      {digits.map((digit, index) => (
        <input
          key={index}
          id={`digit-${index}`}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(e)}
          className="verify-reset-input-box-inputs-input"
        />
      ))}
    </div>
  );
};

export default SixDigitInput;
