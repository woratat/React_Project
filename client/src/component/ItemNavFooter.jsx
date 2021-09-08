import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ItemNavFooter({ toLink, nameLink }) {
    return (
        <Link to={toLink} className="">
            <span>{ nameLink }</span>
        </Link>
    );
}

PropTypes.propTypes = {
    toLink: PropTypes.string.isRequired,
    nameLink: PropTypes.string.isRequired
}