import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import styled from "styled-components";

// component
import CardMovie from "./CardMovie";
// import Star from "./Star";
// import { Link } from "react-router-dom";

function AllMovie({ className ,movieName }) {
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
      <div className={className}>
        {movies.map((movie) => {
          return (
            <CardMovie item={movie} key={movie.movie_id} />
          );
        })}
      </div>
    </>
  );
}

AllMovie.propTypes = {
  className: PropTypes.string.isRequired
}

export default styled(AllMovie)`
  display: grid;
  grid-template-columns: repeat(4, .5fr);
  column-gap: 3rem;
  row-gap: 1.5rem;
`;

{/* <Link to="/">
                <h2>{movie.movie_name}</h2>
              </Link>
              <h3>Rating: {movie.movie_like}</h3>
              <Star like={movie.movie_like} /> */}
