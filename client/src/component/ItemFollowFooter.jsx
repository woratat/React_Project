import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// scss
import FooterStyle from '../assets/scss/footer.module.scss';

export default function ItemFollowFooter({ toLink, nameLink, nameIcon, color  }) {
    return (
        <div className={FooterStyle['footer-item-social']}>
            <div className={FooterStyle['item-icon']}>
                <i className={nameIcon + " " + FooterStyle[color]}></i>
            </div>
            <div className="name-link">
                <Link to={toLink} className="">
                    <span>{ nameLink }</span>
                </Link>
            </div>
        </div>
    )
}

ItemFollowFooter.propTypes = {
    toLink: PropTypes.string.isRequired,
    nameLink: PropTypes.string.isRequired,
    nameIcon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}