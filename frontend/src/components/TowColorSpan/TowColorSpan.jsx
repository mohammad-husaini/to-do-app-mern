import React from "react";
import "./TowColorSpan.css";
import { useNavigate } from "react-router-dom";

const TowColorSpan = ({ firstWord, secondWOrd, path }) => {
  const navigator = useNavigate();

  const handelOnClick = () => {
    navigator(path);
  };
  return (
    <span className="register-span-style1">
      {firstWord}
      <span
        className="register-span-style1 register-span-style2"
        onClick={handelOnClick}
      >
        {secondWOrd}
      </span>
    </span>
  );
};

export default TowColorSpan;
