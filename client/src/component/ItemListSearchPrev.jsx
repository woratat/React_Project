import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link  } from 'react-router-dom';


function ItemListSearchNew({ className, item }) {
    return (
        <Link to={`/detail/${item.movie_id}`} className={className}>
            <div className="content-image">
                <img src={item.movie_image} alt={item.movie_name} />
            </div>
            <div className="content-title">
                <span>{item.movie_name}</span>
            </div>
        </Link>
    );
}

ItemListSearchNew.propTypes = {
    className: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
}

export default styled(ItemListSearchNew)`
    display: flex;
    align-items: center;
    border-radius: 50px;
    padding: .2rem;
    column-gap: .7rem;
    transition: all .2s ease-in;

    :hover {
        background-color: rgba(0, 0, 0, .1);
    }

    .content-image {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;
    }

    .content-image img {
        width: 35px;
        height: 35px;
    }

    .content-title {
        overflow: hidden;
    }
`;