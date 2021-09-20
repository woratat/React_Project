import React, { useState } from "react";

export default function Star({ like }) {
  const [hover, setHover] = useState(null);
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
      {[...Array(5)].map(() => {
        ratingValue += +1;
        return (
          <i className="bx bxs-star" style={{ color: getColor() }} size={20} />
        );
      })}
    </div>
  );
}
