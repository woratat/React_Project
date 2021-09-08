import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ItemFollowFooter({ toLink, nameLink, nameIcon  }) {
    return (
        <Link to={toLink} className="">
            <div className="icon">
                <i className={nameIcon}></i>
            </div>
            <div className="name-link">
                <span>{ nameLink }</span>
            </div>
        </Link>
    )
}

ItemFollowFooter.propTypes = {
    toLink: PropTypes.string.isRequired,
    nameLink: PropTypes.string.isRequired,
    nameIcon: PropTypes.string.isRequired
}