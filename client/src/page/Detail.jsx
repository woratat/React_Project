import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useBody } from '../use'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import validator from 'validator';
import {useParams, Redirect} from 'react-router-dom';

// component
import Header from '../component/Header';
import Main from '../component/MainDetail';
import Footer from '../component/Footer';
import ShowTrailer from '../component/ShowTrailer';

function Detail({ className }){
    const [page] = useState({
        title: '',
        body: 'page-detail'
    });

    const [movies, setMovies] = useState('');
    const {token} = useParams();
    
    useBody(page.body);

    useEffect(() => {
        const getMovie = async () =>{
            try {
                const movie = await axios.get(`http://localhost:5050/api/get/movieDetail/${token}`, {
                    timeout:2000
                })
                setMovies(movie.data[0])
            } catch (error) {
                if(error.response){
                    console.log(error.response);
                }
            }        
        }
        getMovie();
    }, [token]);

    

    if(!validator.isJWT(token)){
        return <Redirect to="/" />
    }

    return(
        <HelmetProvider>
            <Helmet>
            <title>{ page.title }</title>
            </Helmet>
            <Header/>
            <Main>
                <div className={className}>
                    <div className="content-title">
                        <h1 className="">Movie Detail</h1>
                    </div>
                </div>
                <div className="content-detail">
                    <h1>{movies.movie_name}</h1>
                    <ShowTrailer movieLink={movies.movie_link} />
                </div>
            </Main>
            <Footer />
        </HelmetProvider>
    );
}

Detail.prototype ={
    className: PropTypes.string.isRequired
}

export default styled(Detail)`
    
`;