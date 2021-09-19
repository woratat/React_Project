import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import styles from "../assets/scss/row.module.scss";
import { useImage } from "../use/";
import CardMovie from "./CardMovie";
function Row({ title, data }) {
  return (
    <div className={styles.row}>
      <h2>{title}</h2>

      <div className={styles.row_posters}>
        {data.map((item) => {
          return <CardMovie item={item} />;
        })}
      </div>
    </div>
  );
}

export default Row;
