import React, { useState, useEffect } from "react";
import axios from "axios";

// component
import Row from "../component/Row";

export default function ListSeries({ movieName }) {
  const [movies, setMovies] = useState([]);
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

      setMovies(res.data);
    } catch (error) {
      if (error.response) {
        console.error(error.response.message);
      }
    }
  };

  return (
    <>
      <Row title="Trending" data={movies}></Row>
    </>
  );
}
