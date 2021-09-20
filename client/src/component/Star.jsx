import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "../assets/scss/row.module.scss";

export default function Star({ like }) {
  const [hover, setHover] = useState(null);
  let rating = like / 2;
  let ratingValue = 0;
  return (
    <div>
      {[...Array(5)].map(() => {
        ratingValue += +1;
        return (
          <FaStar
            size={20}
            color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
          />
        );
      })}
    </div>
  );
}
