import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// scss
import FooterStyle from '../assets/scss/footer.module.scss';

export default function ItemNavFooter({ toLink, nameLink }) {
    return (
        <Link to={toLink} className={FooterStyle['link-footer']}>
            <span>{ nameLink }</span>
        </Link>
    );
}

PropTypes.propTypes = {
    toLink: PropTypes.string.isRequired,
    nameLink: PropTypes.string.isRequired
}