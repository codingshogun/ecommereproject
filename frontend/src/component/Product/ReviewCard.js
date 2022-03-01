import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/cover.jfif";

const ReviewCard = ({ review }) => {
  return (
    <div className="reviewCard">
      <div className="userDetail">
        <img src={profilePng} alt="user" />
        <p>{review.name}</p>
      </div>
      <div className="start">
        <ReactStars
          {...{
            edit: false,
            color: "gray",
            activeColor: "black",
            size: window.innerWidth < 600 ? 10 : 15,
            value: review.rating,
            isHalf: true,
          }}
        />
      </div>
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
