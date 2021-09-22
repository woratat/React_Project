import React from 'react';
import { useBody } from '../use';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// component
import Header from '../component/HeaderControl';
import Main from '../component/MainRegister';
import Footer from '../component/Footer';

export default function Register() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Movie King | Sign up</title>
            </Helmet>
            <Header />
            <Main />
            <Footer />
        </HelmetProvider>
    );
}
