import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';

// component
import CardMovie from './CardMovie';

function MainFavorite({ className }) {
    const [movies, setMovie] = useState([]);
    useEffect(() => {
        getMovieFavorite();
    });

    const getMovieFavorite = async () => {
        try {
            const res = await axios.get('http://localhost:5050/api/get/favorite', {
                timeout: 2000
            });

            setMovie(res.data);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
            }
        }
    }

    return (
        <main className={className}>
            <div className="show-content-favorite">
                { movies.length === 0 ? 
                    <div>
                       <h1>Movie not fount</h1> 
                    </div>
                :
                    movies.map((item) => {
                        return (
                            <CardMovie key={item.id} item={item} />
                        );
                    })
                }
            </div>
        </main>
    );
}

MainFavorite.propTypes = {
    className: PropTypes.string.isRequired
}

export default styled(MainFavorite)`

`;