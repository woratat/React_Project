import React, { useState, useEffect } from 'react';
import axios from 'axios';

// component
import CardMovie from './CardMovie';

export default function ListMovie({ movieName }) {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const getMovieList = async () => {
            try {
                const res = await axios.get('http://localhost:5050/api/get/movieList', {
                    params: {
                        w: movieName
                    },
                    timeout: 2000
                });
    
                setMovie(res.data);
            } catch (error) {
                if (error.response) {
                    console.error(error.response.message);
                }
            }
        }

        getMovieList();
    }, [movieName]);
    
    return (
        <>
          
        </>
    );
}
