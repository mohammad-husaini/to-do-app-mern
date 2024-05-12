import React, { useState, useEffect } from "react";
import "./NavBar.css";
import logo from "../../assets/logo.svg";
import downArrow from "../../assets/down.svg";
import user from "../../assets/user.png";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

const NavBar = () => {
  const [toggleLogout, setLogoutToggle] = useState(false);
  const navigator = useNavigate();
  const handelOnClickLogoutToggle = () => {
    setLogoutToggle(!toggleLogout);
  };
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const imageDataString = localStorage.getItem("userImage");

    if (imageDataString) {
      const imageBuffer = Buffer.from(imageDataString.split(","), "base64");

      const blob = new Blob([imageBuffer], { type: "image/jpeg" });

      const imageUrl = URL.createObjectURL(blob);

      setImageSrc(imageUrl);
    }
  }, []);
  const handelOnClickLogout = () => {
    localStorage.removeItem("jwtToken");
    navigator("/login");
  };
  return (
    <div className="nav-bar">
      <div className="avatar-box">
        <img
          alt="down-arrow"
          className="nav-bar-down-arrow"
          src={downArrow}
          onClick={handelOnClickLogoutToggle}
        ></img>
        {toggleLogout && (
          <div className="nav-bar-logout">
            <span className="nav-bar-logout-span" onClick={handelOnClickLogout}>
              تسجيل الخروج
            </span>
          </div>
        )}
        <img
          className="avatar"
          alt="avatar"
          src={imageSrc ? imageSrc : user}
        ></img>
      </div>
      <img alt="logo" src={logo} className="logo"></img>
    </div>
  );
};

export default NavBar;
