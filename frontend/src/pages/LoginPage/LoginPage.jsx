import { useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import GreenCard from "../../components/GreenCard/GreenCard";
import loginImage from "../../assets/signIn.png";
import alertIcon from "../../assets/alert.svg";
import InputField from "../../components/InputField/InputField";
import TowColorSpan from "../../components/TowColorSpan/TowColorSpan";
import AuthButton from "../../components/Buttons/AuthButton/AuthButton";
import AuthTitle from "../../components/Titels/AuthTitle/AuthTitle";
import { toast } from "react-toastify";
import InputPassword from "../../components/InputField/InputPassword";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  const startAutoLogoutTimer = () => {
    setTimeout(() => {
      localStorage.removeItem("jwtToken");
      navigator("/login");
    }, 5 * 60 * 1000);
  };

  const handelLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      const userImage = res?.data?.user?.data || "";
      localStorage.setItem("userImage", userImage);
      localStorage.setItem("jwtToken", res.data.token);
      navigator("/");
      startAutoLogoutTimer();
      toast.success("Successfully Login", {
        position: "bottom-right",
        toastId: "LoginSuccess",
      });
    } catch (error) {
      setError(true);
      console.error("Login error:", error);
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

  const handelOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    handelLogin();
  };

  return (
    <div className="sign-in">
      <GreenCard
        img={loginImage}
        title={"مرحبا بك في موقع مهمتك"}
        description={
          "مهمتك هو عبارة عن موقع الكتروني يساعدك في انجاز مهامك بسهولة"
        }
      ></GreenCard>
      <div className="login-card-frame">
        <form className="login-form" onSubmit={handelOnSubmit}>
          <AuthTitle title={"تسجبل الدخول"}></AuthTitle>
          <InputField
            placeholder={`${
              error ? "الرجاء ادخال البريد الالكتروني" : "example@gmail.com"
            }`}
            label={"البريد الالكتروني"}
            onChange={handelOnChangeEmail}
            error={error}
          ></InputField>

          <InputPassword
            placeholder={".........."}
            error={error}
            setPassword={setPassword}
          ></InputPassword>
          <div className="forget-pass-field">
            <span
              className="forget-pass-span"
              onClick={() => {
                navigator("/request-reset-password");
              }}
            >
              نسيت كلمة المرور؟
            </span>
          </div>
          {error && (
            <div className="login-error-box">
              <span className="login-error-span">
                عذراً, يبدو ان هنالك خطأ في كلمة البريد الالكتروني او كلمة
                المرور
              </span>
              <img
                className="login-error-icon"
                alt="error"
                src={alertIcon}
              ></img>
            </div>
          )}
          <AuthButton title={"تسجيل الدخول"}></AuthButton>
          <TowColorSpan
            firstWord={"ليس لديك حساب؟"}
            secondWOrd={"انشاء حساب"}
            path={"/register"}
          ></TowColorSpan>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
