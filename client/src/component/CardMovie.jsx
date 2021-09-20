import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import styles from "../assets/scss/row.module.scss";
import { Link } from "react-router-dom";

function CardMovie({ className, item }) {
  const [movie, setMovie] = useState(item);
  return (
    <Link to={`/detail/${item.movie_id}`}>
      <img
        className={className}
        src={movie.movie_image}
        alt={movie.movie_name}
      />
    </Link>
  );
}

CardMovie.propTypes = {
  className: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
};

export default styled(CardMovie)``;
