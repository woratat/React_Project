import React from "react";
import styles from "../assets/scss/row.module.scss";
function Row({ title, data }) {
  return (
    <div className={styles.row}>
      <h2>{title}</h2>

      <div className={styles.row_posters}>
        {data.map((item) => {
          return (
            <img
              src={item.movie_image}
              alt={item.movie_name}
              key={item.movie_id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Row;
