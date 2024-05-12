import React, { useState } from "react";
import GreenCard from "../../../components/GreenCard/GreenCard";
import AuthTitle from "../../../components/Titels/AuthTitle/AuthTitle";
import InputField from "../../../components/InputField/InputField";
import AuthButton from "../../../components/Buttons/AuthButton/AuthButton";
import TowColorSpan from "../../../components/TowColorSpan/TowColorSpan";
import "./RequestPasswordResetPage.css";
import FPR1 from "../../../assets/fpr1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RequestPasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const navigator = useNavigate();

  const handelEmailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handelOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/reset/request", {
        email: email,
      });

      navigator(`/verify-reset-password/${email}`);
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
    <div className="request-password-reset">
      <div className="request-password-reset-card">
        <form className="request-password-reset-form" onSubmit={handelOnSubmit}>
          <AuthTitle title={"اعادة تعيين كلمة المرور"}></AuthTitle>
          <InputField
            label={"البريد الالكتروني"}
            placeholder={"example@gmail.com"}
            onChange={handelEmailOnChange}
          ></InputField>
          <AuthButton title={"متابعة"}></AuthButton>
          <TowColorSpan
            firstWord={"هل تذكرت كلمة المرور؟"}
            secondWOrd={" تسجيل الدخول"}
            path={"/login"}
          ></TowColorSpan>
        </form>
      </div>
      <GreenCard
        img={FPR1}
        title={"هل نسيت كلمة المرور؟"}
        description={
          "لاتقلق هذا يحدث احيانا, الرجاء ادخال بريدك الالكتروني في الحقل المخصص وعند تاكيده سيتم ارسال رمز اعادة تعيين كلمة المرور على بريدك الاكتروني"
        }
      ></GreenCard>
    </div>
  );
};

export default RequestPasswordResetPage;
