import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

// component
import Star from './Star';

function CardSerie({ className, item }) {

  return (
    <div className={className}>
      <img src={item.tv_image} alt={item.tv_name} className="image-movie" />
      <div className="info">
        <div className="content-show">
          <span className="title-movie">{ item.tv_name }</span>
          <div className="show-star">
            <Star like={item.tv_like} />
          </div>
          <div className="content-control">
            <Link to={`/tvdetail/${item.tv_id}`} className="btn-click-detail">
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

CardSerie.propTypes = {
  className: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
};

export default styled(CardSerie)`
  width: 280px;
	height: 360px;
	border-radius: 15px;
	padding: 1.5rem;
	background: white;
	position: relative;
	display: flex;
	align-items: flex-end;
	transition: 0.4s ease-out;
	box-shadow: 0px 7px 10px rgba(black, 0.5);
    
  :hover::before {
      opacity: 1;
  }

  :hover .info {
    opacity: 1;
	  transform: translateY(0px);
  }

  ::before {
    content: "";
		position: absolute;
		top: 0;
		left: 0;
		display: block;
    border-radius: 15px;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .8555);
		z-index: 2;
		transition: 0.5s;
		opacity: 0;
  }

  .image-movie {
    width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 15px;
  }

  .info {
    position: relative;
		z-index: 3;
		color: white;
		opacity: 0;
		transform: translateY(30px);
		transition: 0.5s;
  }

  .content-show {
    margin-bottom: 1rem;
  }

  .title-movie {
    margin: 0;
    font-size: 1.2rem;
  }

  .show-star {
    margin-top: .5rem;
  }

  .content-control {
    margin-top: .5rem;
    display: flex;
    align-items: center;
    column-gap: 1rem;
    font-size: 1rem;
  }

  .btn-click-detail {
    padding: 0.355rem;
		outline: none;
		border: 1px solid rgba(48, 87, 225, 1);
    letter-spacing: 1px;
		border-radius: 1px;
		background: transparent;
		color: #ffffff;
		cursor: pointer;
		transition: 0.4s ease;
  }

  .btn-click-detail:hover {
    background: rgba(48, 87, 225, 1);
		color: white;
  }
`;
