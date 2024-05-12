import React, { useState } from "react";
import "./VerifyResetCodePage.css";
import FPR2 from "../../../assets/fpr2.png";
import GreenCard from "../../../components/GreenCard/GreenCard";
import AuthTitle from "../../../components/Titels/AuthTitle/AuthTitle";
import AuthButton from "../../../components/Buttons/AuthButton/AuthButton";
import TowColorSpan from "../../../components/TowColorSpan/TowColorSpan";
import SixDigitInput from "../../../components/CodePin/SixDigitInput";
import reloadIcon from "../../../assets/reload.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const VerifyResetCodePage = () => {
  const [pin, setPin] = useState([]);
  const navigator = useNavigate();
  const { email } = useParams();
  const handelOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/reset/verify", {
        code: pin,
        email: email,
      });

      navigator(`/reset-password/${email}/${pin}`);
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
    <div className="verify-reset">
      <div className="verify-reset-card">
        <form className="verify-reset-form" onSubmit={handelOnSubmit}>
          <AuthTitle title={"التحقق من الرمز"}></AuthTitle>

          <div className="verify-reset-input-box">
            <span className="verify-reset-input-box-label ">
              {email}
              <span className="verify-reset-input-box-label text-style-1">
                {" قم بادخال الرمز المرسلة الى بريدك الالكتروني"}
              </span>
            </span>

            <SixDigitInput setPin={setPin}></SixDigitInput>
          </div>
          <div className="verify-reset-resend-box">
            <span className="verify-reset-resend-span">اعادة الارسال</span>
            <img
              className="verify-reset-resend-box-icon"
              src={reloadIcon}
              alt="reload"
            ></img>
          </div>
          <AuthButton title={"متابعة"}></AuthButton>
          <TowColorSpan
            firstWord={"هل تذكرت كلمة المرور؟"}
            secondWOrd={"تسجيل الدخول"}
            path={"/login"}
          ></TowColorSpan>
        </form>
      </div>
      <GreenCard
        img={FPR2}
        title={"التحقق من الرمز!"}
        description={
          "لقد تم ارسال رمز على بريدك الالكتروني الرجاء كتابته في الحقول المخصصة لبدء استرجاع كلمة المرور"
        }
      ></GreenCard>
    </div>
  );
};

export default VerifyResetCodePage;
