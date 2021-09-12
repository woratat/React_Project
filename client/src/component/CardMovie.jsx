import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useImage } from '../use'

function CardMovie({ className, item }) {
    const [imageLink] = useImage(item.movie_image);

    return (
        <div className={className}>
            <img src={imageLink} alt="movie" />

            <div className="content-card">
                <div className="button-control">
                    
                </div>
            </div>
        </div>
    );
}

CardMovie.propTypes = {
    className: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
}

export default styled(CardMovie)`

`;