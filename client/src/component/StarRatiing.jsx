import React, { useState } from "react";

export default function StarRatiing() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const getColor = () => {
    if (ratingValue <= (rating || hover)) {
      return "#ffc107";
    } else {
      return "#e4e5e9";
    }
  };
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              id=""
            />
            <i
              className="bx bxs-star"
              style={{ color: getColor() }}
              size={20}
            />
          </label>
        );
      })}
    </div>
  );
}
