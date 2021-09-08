import React from 'react';
import PropTypes from 'prop-types';

export default function LinkFooter({ title, children }) {
    return (
        <div className="component-footer">
            <div className="title-footer-item">
                <span>{ title }</span>
            </div>
            <div className="link-footer-item">
                { children }
            </div>
        </div>
    );
}

LinkFooter.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}