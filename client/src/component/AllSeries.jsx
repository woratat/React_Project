import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import styled from "styled-components";
// component
import CardSerie from "./CardSerie";

function AllSeries({ className ,movieName }) {
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
    <div className={className}>
      <h1>All Tv Show</h1>
      <div className="list-movie">
        {series.map((serie) => {
          return (
            <CardSerie key={serie.tv_id} item={serie} />
          );
        })}
      </div>
    </div>
  );
}

AllSeries.propTypes = {
  className: PropTypes.string.isRequired
}

export default styled(AllSeries)`
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

