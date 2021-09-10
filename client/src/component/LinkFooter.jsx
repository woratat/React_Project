import React from 'react';
import PropTypes from 'prop-types';

import FooterStyle from '../assets/scss/footer.module.scss';

export default function LinkFooter({ title, children }) {
    return (
        <div className={FooterStyle['component-footer']}>
            <div className={FooterStyle['title-footer-item']}>
                <span>{ title }</span>
            </div>
            <div className={FooterStyle['link-footer-item']}>
                { children }
            </div>
        </div>
    );
}

LinkFooter.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}