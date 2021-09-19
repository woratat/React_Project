import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

function HeaderControl({ className }) {
    return (
        <header className={className}>
            <div className="content-logo">
                <Link to="/">
                    <span className="title-logo">Movie<span className="title-king">King</span></span>
                </Link>
            </div>
        </header>
    )
}

HeaderControl.propTypes = {
    className: PropTypes.string.isRequired
}

export default styled(HeaderControl)`
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 1.5rem;
    box-shadow: 0 6px 6px rgba(0, 0, 0, 6%);
    background-color: #fff;

    .title-logo {
        font-size: 1.8rem;
        color: rgba(48, 87, 225, 1);
        letter-spacing: .2rem;
    }

    .title-king {
        background-color: rgba(48, 87, 225, 1);
        padding: 7px;
        color: white;
        border-radius: 6px;
    }
`;