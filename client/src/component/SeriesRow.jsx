import React from "react";
import styles from "../assets/scss/row.module.scss";
import CardSerie from "./CardSerie";
function SeriesRow({ title, data }) {
  return (
    <div className={styles.row}>
      <h2>{title}</h2>

      <div className={styles.row_posters}>
        {data.map((item) => {
          return (
            <CardSerie
              item={item}
              key={item.tv_id}
              className={styles.row_poster}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SeriesRow;
