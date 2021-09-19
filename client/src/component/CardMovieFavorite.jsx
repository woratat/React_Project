import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeMovieFavorite } from '../actions/MovieFavoriteAction';

function CardMovieFavorite({ className, item }) {
    const dispatch = useDispatch();

    const removeMovie = (movie_name, favorite_id) => {
        swal.fire({
            title: movie_name,
            text: 'Do you want remove movie?',
            showCancelButton: true,
            cancelButtonColor: 'rgba(48, 87, 225, 1)',
            confirmButtonText: 'Remove',
            confirmButtonColor: '#f25'
        }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete('http://localhost:5050/api/delete/favorite', {
                        timeout: 2000,
                        params: {
                            w: favorite_id
                        }
                    });

                    if (res.status === 200) {
                        swal.fire({
                            title: 'Remove',
                            text: res.data.message,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            allowOutsideClick: false
                        }).then(() => {
                            dispatch(removeMovieFavorite({ favorite_id: res.data.favorite_id }));
                        });
                    }
                } catch (error) {
                    if (error.response) {
                        console.error(error.response.message);
                    }
                }
            }
        });
    }



    return (
        <div className={className}>
            <img src={item.movie_image} alt="favorite movies" className="image-movie" />
            <div className="info">
                <div className="content-show">
                    <span className="title-movie">{ item.movie_name }</span>
                </div>
                <div className="content-control">
                    <button className="btn-click-delete" onClick={() => { removeMovie(item.movie_name, item.favorite_id) }}>Remove Movie</button>
                    <Link to={`/detail/${item.movie_id}`} className="btn-click-detail">Detail</Link>
                </div>
            </div>
        </div>
    );
}

CardMovieFavorite.propTypes = {
    className: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
}

export default styled(CardMovieFavorite)`
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
		background: rgba(0, 0, 0, .8);
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
    }

    .content-control {
        display: flex;
        align-items: center;
        column-gap: 1rem;
        font-size: 1rem;
    }

    .btn-click-delete {
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

    .btn-click-delete:hover {
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
