import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieFavorite } from '../actions/MovieFavoriteAction';

// component
import CardMovieFavorite from './CardMovieFavorite';

function MainFavorite({ className, user }) {
    const movies = useSelector((state) => state.movie_favorite);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMovieFavorite = async () => {
            try {
                const res = await axios.get('http://localhost:5050/api/get/favorite', {
                    timeout: 2000,
                    params: {
                        token: user
                    }
                });
    
                dispatch(fetchMovieFavorite(res.data));
            } catch (error) {
                if (error.response) {
                    console.log(error.response);
                }
            }
        }

        getMovieFavorite();
    }, [user, dispatch]);

    return (
        <main className={className}>
            <div className="show-content-favorite">
                { movies.length === 0 ? 
                    <div>
                       <h1>Movie not fount</h1> 
                    </div>
                :
                    <div className="show-item">
                        { movies.map((item) => {
                            return (
                                <CardMovieFavorite key={item.favorite_id} item={item} />
                            );
                        }) }
                    </div>
                }
            </div>
        </main>
    );
}

MainFavorite.propTypes = {
    className: PropTypes.string.isRequired
}

export default styled(MainFavorite)`
    margin: 7.5rem 2rem 0 2rem;

    .show-content-favorite {
        display: flex;
        justify-content: center;
    }

    .show-item {
        display: grid;
        grid-template-columns: repeat(4, .5fr);
        column-gap: 3rem;
        row-gap: 1.5rem;
    }
`;