import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useBody } from '../use';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// component
import Header from '../component/Header';
import Footer from '../component/Footer';

function Favorite() {
    useBody('favorite-page');

    return (
        <HelmetProvider>
            <Helmet>
                <title>Movie King | My Favorite</title>
            </Helmet>
            <Header />
            <Footer />
        </HelmetProvider>
    );
}

Favorite.propTypes = {
    className: PropTypes.string.isRequired
}

export default styled(Favorite)`

`; 