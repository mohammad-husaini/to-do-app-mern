import { useState } from "react";
import "./InputPassword.css";
import AiFillEye from "../../assets/AiFillEye.svg";

const InputPassword = ({ error, setPassword, placeholder }) => {
  const [toggleEye, setToggleEye] = useState(true);

  const handelOnClickEye = () => {
    setToggleEye(!toggleEye);
  };
  const handelOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="password-field">
      <span className={`password-label ${error ? "red-error-span" : ""}`}>
        كلمة المرور
      </span>
      <div className={`pass-input-field ${error ? "red-error-border" : ""}`}>
        <div className="eye-button">
          <img
            src={AiFillEye}
            alt="eye-icon"
            className="eye-icon"
            onClick={handelOnClickEye}
          ></img>
        </div>
        <div className="line"></div>
        <input
          placeholder={`${error ? "الرجاء ادخال كلمة المرور" : placeholder}`}
          className={` ${error ? "error-pass-input" : "pass-input"}`}
          type={`${toggleEye ? "password" : "text"}`}
          autoComplete=""
          onChange={handelOnChangePassword}
        ></input>
      </div>
    </div>
  );
};

export default InputPassword;
