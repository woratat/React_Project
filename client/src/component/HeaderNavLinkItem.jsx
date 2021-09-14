import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function HeaderNavLinkItem({ title, toLink}) {
    return (
        <NavLink to={toLink} className="link-item-header" activeClassName="active-item-header">
            <span>{ title }</span>           
        </NavLink>
    );
}

HeaderNavLinkItem.propTypes = {
    title: PropTypes.string.isRequired,
    toLink: PropTypes.string.isRequired
}

