import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// component
import Carousel from './Carousel';

function MainHome({ className, children }) {
    return (
        <main className={className}>
            <section className="content-carousel">
                <Carousel />
            </section>
            <section className="content-list-movie">
                { children }
            </section>
        </main>
    );
}

MainHome.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default styled(MainHome)`
    margin-top: 8rem;

    .content-carousel {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

