import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// component
import Carousel from './Carousel';

function MainHome({ className, children }) {
    return (
        <main className={className}>
            <section className="content-carousel">
                <div>
                    <h1>Movie New</h1>
                </div>
                <div>
                    <Carousel />
                </div>
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
    max-width: 1420px;
    margin: 0 auto;
    margin-top: 8rem;

    .content-carousel {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 3rem;
    }

    @media screen and (max-width: 990px) {
        margin-top: 16rem;
    }
`;

