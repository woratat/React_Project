import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// component

function MainDetail({ className, children }) {
    return (
        <main className={className}>
            {children}
        </main>
    );
}

MainDetail.propTypes = {
    className: PropTypes.string.isRequired,
}

export default styled(MainDetail)`
    max-width: 1420px;
    margin: 0 auto;
    margin-top: 8rem;

    @media screen and (max-width: 990px) {
        margin-top: 18rem;
    }
`;

