import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useBody } from '../use';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// component
import Header from '../component/HeaderControl';
import Main from '../component/MainLogin';
import Footer from '../component/Footer';

function Login({ className }) {
    useBody('login-page');

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

Login.propTypes = {
    className: PropTypes.string.isRequired
}

export default styled(Login)`
    
`;