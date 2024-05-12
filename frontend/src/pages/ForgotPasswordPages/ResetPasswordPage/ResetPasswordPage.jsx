import React, { useState } from "react";
import "./ResetPasswordPage.css";
import GreenCard from "../../../components/GreenCard/GreenCard";
import FPR3 from "../../../assets/fpr3.png";
import AuthTitle from "../../../components/Titels/AuthTitle/AuthTitle";
import AiFillEye from "../../../assets/AiFillEye.svg";
import AuthButton from "../../../components/Buttons/AuthButton/AuthButton";
import TowColorSpan from "../../../components/TowColorSpan/TowColorSpan";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPasswordPage = () => {
  const navigator = useNavigate();
  const { email, code } = useParams();
  const [newPassword, setNewPassword] = useState();
  const [toggleEye, setToggleEye] = useState(true);

  const handelNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handelOnClickEye = () => {
    setToggleEye(!toggleEye);
  };

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/reset/password", {
        email: email,
        code: code,
        newPassword: newPassword,
      });
      navigator("/login");
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, {
          position: "bottom-right",
          toastId: "serverError",
        });
      } else {
        toast.error("An error occurred. Please try again later.", {
          position: "bottom-right",
          toastId: "serverError",
        });
      }
    }
  };

  return (
    <div className="reset-password">
      <GreenCard
        img={FPR3}
        title={"انت تبلي حسناً"}
        description={
          "...يمكنك الان اعادة تعيين كلمة المرور واداخال كلمة مرور جديدة والبدء في انجاز مهماتك"
        }
      ></GreenCard>
      <div className="reset-password-card">
        <form className="reset-password-form" onSubmit={handelOnSubmit}>
          <AuthTitle title={"تعيين كلمة المرور الجديدة"}></AuthTitle>
          <div className="email-field">
            <span className="email-label">كلمة المرور</span>
            <div className="pass-input-field">
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
                placeholder="@#*%"
                className="pass-input-new"
                type={`${toggleEye ? "password" : "text"}`}
                autoComplete=""
                onChange={handelNewPasswordChange}
              ></input>
            </div>
            <div className="pass-tip">
              <span className="pass-tip-label">
                يجب ان تتكون كلمة المرور على 8 رموز على الاقل يجب ان تحتوي كلمة
                المرور على رموز وأرقام
              </span>
            </div>
          </div>
          <AuthButton title={"اعادة تعيين كلمة المرور"}></AuthButton>
          <TowColorSpan
            firstWord={"هل تذكرت كلمة المرور؟"}
            secondWOrd={"تسجيل الدخول"}
            path={"/login"}
          ></TowColorSpan>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
