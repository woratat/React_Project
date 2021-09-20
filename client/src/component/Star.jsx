import React from "react";

export default function Star({ like }) {
  let rating = like / 2;
  let ratingValue = 0;

  const getColor = () => {
    if (ratingValue <= rating) {
      return "#ffc107";
    } else {
      return "#e4e5e9";
    }
  };


  return (
    <div>
      {[...Array(5)].map((val, index) => {
        ratingValue += +1;
        return (
          <i key={index} className="bx bxs-star" style={{ color: getColor() }} size={20} />
        );
      })}
    </div>
  );
}
