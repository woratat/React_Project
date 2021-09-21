import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import Swal from "sweetalert2";

// component
import Star from './Star';

function CardMovie({ className, item }) {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const handleFavorite = (id, title) => {
    Swal.fire({
      title: title,
      text: 'Do you want to add this movie in your favorite?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#f25',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        const post = async () => {
          try {
            const res = await axios.post(`http://localhost:5050/api/post/favorite/${user[0].user}`, { token_movie: id });
  
            if (res.status === 200) {
              const toast = await Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1600,
              });
  
              toast.fire({
                title: 'Movie added',
                icon: 'success'
              });
            }
          } catch (error) {
            console.log(error.response);
          }
        }

        post();
      }
    });
  }

  const handleLogin = () => {
    history.push('/login');
  }

  return (
    <div className={className}>
      <img src={item.movie_image} alt={item.movie_name} className="image-movie" />
      <div className="info">
        <div className="content-show">
          <span className="title-movie">{ item.movie_name }</span>
          <div className="show-star">
            <Star like={item.movie_like} />
          </div>
          <div className="content-control">
            { user.length === 0
            ?
              <button type="button" className="btn-favorite" onClick={handleLogin}>
                <i className='bx bxs-heart'></i>
                <span>Favorite</span>
              </button>
            :
              <button type="button" className="btn-favorite" onClick={() => { handleFavorite(item.movie_id) }} >
                <i className='bx bxs-heart'></i>
                <span>Favorite</span>
              </button>
            }
            <Link to={`/detail/${item.movie_id}`} className="btn-click-detail">
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

CardMovie.propTypes = {
  className: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
};

export default styled(CardMovie)`
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

  .btn-favorite {
    display: flex;
    align-items: center;
    column-gap: .6rem;
    padding: 0.6rem;
		outline: none;
    letter-spacing: 1px;
		border: 1px solid rgba(255, 34, 85, 0.4);
		border-radius: 1px;
		background: rgba(255, 34, 85, 0.4);
		color: #ffffff;
		cursor: pointer;
		transition: 0.4s ease;
  }

  .btn-favorite:hover {
    background: #f25;
		color: white;
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
