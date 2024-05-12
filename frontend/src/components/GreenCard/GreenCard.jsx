import React from "react";
import "./GreenCard.css";
const GreenCard = ({ img, title, description }) => {
  return (
    <div className="green-card-frame">
      <img className="green-card-frame-img" alt={"img"} src={img}></img>
      <div className="description-container">
        <span className="title-container-span">{title}</span>
        <span className="description-container-span">{description}</span>
      </div>
    </div>
  );
};

export default GreenCard;
