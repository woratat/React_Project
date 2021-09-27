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
    <div className={className}>
      <h1>All movie</h1>
      <div className="list-movie">
        {movies.map((movie) => {
          return (
            <CardMovie item={movie} key={movie.movie_id} />
          );
        })}
      </div>
    </div>
  );
}

AllMovie.propTypes = {
  className: PropTypes.string.isRequired
}

export default styled(AllMovie)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .list-movie {
    display: grid;
    grid-template-columns: repeat(5, .5fr);
    column-gap: 1rem;
    row-gap: 1.5rem;
  }

  @media screen and (max-width: 1470px) {
    .list-movie {
      display: grid;
      grid-template-columns: repeat(4, .5fr);
      column-gap: 3rem;
      row-gap: 1.5rem;
    }
  }

  @media screen and (max-width: 1290px) {
    .list-movie {
      display: grid;
      grid-template-columns: repeat(3, .5fr);
      column-gap: 3rem;
      row-gap: 1.5rem;
    }
  }

  @media screen and (max-width: 1090px) {
    .list-movie {
      display: grid;
      grid-template-columns: repeat(3, .5fr);
      column-gap: 1rem;
      row-gap: 1.5rem;
    }
  }

  @media screen and (max-width: 890px) {
    .list-movie {
      display: grid;
      grid-template-columns: repeat(2, .5fr);
      column-gap: 3rem;
      row-gap: 1.5rem;
    }
  }
`;
