import React, { useEffect } from 'react';
import { useBody } from '../use';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../actions/userAction';
import { getUser } from '../auth/user.auth';

// component
import Header from '../component/Header';
import Main from '../component/MainFavorite';
import Footer from '../component/Footer';


export default function Favorite() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
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
            <Main user={user[0].user} />
            <Footer />
        </HelmetProvider>
    );
}