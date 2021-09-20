import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import styles from "../assets/scss/row.module.scss";
// component
import CardMovie from "./CardMovie";
import Star from "./Star";
import { Link } from "react-router-dom";

export default function AllMovie({ movieName }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovieList(movieName);
  }, [movieName]);

  const getMovieList = async (movieName) => {
    try {
      const res = await axios.get("http://localhost:5050/api/get/movieList", {
        params: {
          w: movieName,
        },
        timeout: 2000,
      });

      setMovies(res.data);
    } catch (error) {
      if (error.response) {
        console.error(error.response.message);
      }
    }
  };

  return (
    <>
      <h1>All movie</h1>
      <div className={styles.all_movie}>
        {movies.map((movie) => {
          return (
            <div className={styles.card}>
              <CardMovie
                className={styles.image}
                item={movie}
                key={movie.movie_id}
              />
              <Link to="/">
                <h2>{movie.movie_name}</h2>
              </Link>
              <h3>Rating: {movie.movie_like}</h3>
              <Star like={movie.movie_like} />
            </div>
          );
        })}
      </div>
    </>
  );
}
