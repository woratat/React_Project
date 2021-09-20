import React, { useState, useEffect } from "react";
import axios from "axios";

// component
import SeriesRow from "./SeriesRow";

export default function ListSeries({ movieName }) {
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
      <SeriesRow title="Trending" data={series} />
      <SeriesRow title="Comedy" data={series} />
      <SeriesRow title="Horror" data={series} />
      <SeriesRow title="Action" data={series} />
    </>
  );
}
