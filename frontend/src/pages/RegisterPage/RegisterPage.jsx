import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";
import GreenCard from "../../components/GreenCard/GreenCard";
import signUp from "../../assets/signUp.png";
import AiFillEye from "../../assets/AiFillEye.svg";
import InputField from "../../components/InputField/InputField";
import IconWrapper from "../../assets/icon-wrapper-h.svg";
import AuthButton from "../../components/Buttons/AuthButton/AuthButton";
import TowColorSpan from "../../components/TowColorSpan/TowColorSpan";
import AuthTitle from "../../components/Titels/AuthTitle/AuthTitle";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggleEye, setToggleEye] = useState(true);
  const navigator = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handelOnClickEye = () => {
    setToggleEye(!toggleEye);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", selectedImage);

      await axios.post("http://localhost:5000/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigator("/login");
      toast.success("Successfully Register", {
        position: "bottom-right",
        toastId: "RegisterSuccess",
      });
    } catch (error) {
      console.error("Registration error:", error);
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
    <div className="sign-up">
      <div className="register-side">
        <form className="register-form" onSubmit={handleSubmit}>
          <AuthTitle title={"انشاء حساب"}></AuthTitle>
          <div className="register-form-input-field">
            <InputField
              placeholder={"معاوية"}
              label={"اسم المستخدم"}
              value={username}
              onChange={handleUsernameChange}
            ></InputField>
            <InputField
              placeholder={"example@gmail.com"}
              label={"البريد الالكتروني"}
              value={email}
              onChange={handleEmailChange}
            ></InputField>

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
                  value={password}
                  onChange={handlePasswordChange}
                ></input>
              </div>
              <div className="pass-tip">
                <span className="pass-tip-label">
                  يجب ان تتكون كلمة المرور على 8 رموز على الاقل يجب ان تحتوي
                  كلمة المرور على رموز وأرقام
                </span>
              </div>
            </div>

            <div className="img-container">
              <div className="img-container-label">
                <span className="img-container-label-text2">(اختياري)</span>
                <span className="img-container-label-text1">
                  الصورة الشخصية
                </span>
              </div>
              <div className="img-container-upload-box">
                <input
                  id="file-input"
                  type="file"
                  className="disable"
                  accept="image/*"
                  onChange={handleImageChange}
                ></input>
                <label
                  id="file-input-label"
                  htmlFor="file-input"
                  className="img-container-upload-box-button-span "
                >
                  ارفاق صورة
                </label>
                <div className="img-container-upload-box-avatar">
                  {selectedImage && (
                    <img
                      alt="Selected"
                      src={URL.createObjectURL(selectedImage)}
                      className="img-container-upload-box-img"
                    />
                  )}
                  {!selectedImage && (
                    <img
                      alt="icon-wrapper"
                      src={IconWrapper}
                      className="img-container-upload-box-img"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <AuthButton title={"انشاء حساب"}></AuthButton>
          <TowColorSpan
            firstWord={"هل لديك حساب بلفعل؟"}
            secondWOrd={"تسجيل الدخول"}
            path={"/login"}
          ></TowColorSpan>
        </form>
      </div>
      <GreenCard
        alt={"signup-img"}
        img={signUp}
        title={"هيا لنبدء رحلتك سويا"}
        description={
          "قم بانشاء حساب مجاني تماماً في موقع مهمتك, ودعنا نرتب مهامك سويا"
        }
      ></GreenCard>
    </div>
  );
};

export default RegisterPage;
