import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { useBody } from '../use';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../actions/userAction';
import { getUser } from '../auth/user.auth';

// component
import Header from '../component/Header';
import Footer from '../component/Footer';


function Favorite() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [favorite, setFavorite] = useState([]);
    useBody('favorite-page');

    useEffect(() => {
        const fetch = async () => {
            try {
                dispatch(fetchUser( await getUser()));
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    }, [dispatch]);

    useEffect(() => {
        const getMovieFavorite = async () => {
            try {
                const res = await axios.get('http://localhost:5050/api/get/favorite', {
                    timeout: 2000,
                    params: {
                        token: user[0].user
                    }
                });

                if (res.status === 200) {
                    setFavorite(res.data);
                }
            } catch (error) {
                console.log(error.response);
            }
        }

        getMovieFavorite();
    }, [user]);

    if (user.length === 0) {
        return (
            <Redirect to="/"/>
        );
    } 

    return (
        <HelmetProvider>
            <Helmet>
                <title>Movie King | My Favorite</title>
            </Helmet>
            <Header />
            <main>
                
            </main>
            <Footer />
        </HelmetProvider>
    );
}

Favorite.propTypes = {
    className: PropTypes.string.isRequired
}

export default styled(Favorite)`

`; 