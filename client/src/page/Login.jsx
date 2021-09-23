import React, { useEffect } from 'react';
import { useBody } from '../use';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchUser } from '../actions/userAction';
import { getUser } from '../auth/user.auth';

// component
import Header from '../component/HeaderControl';
import Main from '../component/MainLogin';
import Footer from '../component/Footer';

export default function Login({ className }) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useBody('login-page');

    useEffect(() => {
        const fetch = async () => {
            try {
              dispatch(fetchUser( await getUser() ));
            } catch (error) {
              console.log(error);
            }
        }

        fetch();
    }, [dispatch]);

    if (user.length === 1) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>Movie King | Login</title>
            </Helmet>
            <Header />
            <Main />
            <Footer />
        </HelmetProvider>
    );
}