import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

function CardSerie({ className, item }) {
  const [serie, setSerie] = useState(item);
  return (
    <Link to={`/tvdetail/${item.tv_id}`}>
      <img className={className} src={serie.tv_image} alt={serie.tv_name} />
    </Link>
  );
}

CardSerie.propTypes = {
  className: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
};

export default styled(CardSerie)``;
