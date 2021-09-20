import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

function CardSerie({ className, item }) {

  return (
    <Link to={`/tvdetail/${item.tv_id}`}>
      <img className={className} src={item.tv_image} alt={item.tv_name} />
    </Link>
  );
}

CardSerie.propTypes = {
  className: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
};

export default styled(CardSerie)`
  
`;
