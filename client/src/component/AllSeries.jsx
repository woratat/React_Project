import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import styles from "../assets/scss/row.module.scss";
// component
import CardSerie from "./CardSerie";
import Star from "./Star";
import { Link } from "react-router-dom";

export default function AllSeries({ movieName }) {
  const [series, setSeries] = useState([]);
  useEffect(() => {
    getMovieList(movieName);
  }, [movieName]);

  const getMovieList = async (movieName) => {
    try {
      const res = await axios.get("http://localhost:5050/api/get/tvShow", {
        params: {
          w: movieName,
        },
        timeout: 2000,
      });

      setSeries(res.data);
    } catch (error) {
      if (error.response) {
        console.error(error.response.message);
      }
    }
  };

  return (
    <>
      <h1>All Tv Show</h1>
      <div className={styles.all_movie}>
        {series.map((serie) => {
          return (
            <div className={styles.card}>
              <CardSerie
                className={styles.image}
                item={serie}
                key={serie.tv_id}
              />
              <Link to="/">
                <h2>{serie.tv_name}</h2>
              </Link>
              <Star like={serie.tv_like} />
            </div>
          );
        })}
      </div>
    </>
  );
}
