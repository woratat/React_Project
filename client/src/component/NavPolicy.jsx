import React from 'react';
import { Link } from 'react-router-dom';

import FooterStyle from '../assets/scss/footer.module.scss';

export default function NavPolicy() {
    return (
        <ul className={FooterStyle['list-privacy']}>
            <li className="">
                <Link to="/" className={FooterStyle['btn-link-privacy']}>
                    <span>Privacy Policy</span>
                </Link>
            </li>
            <li className="">
                <Link to="/" className={FooterStyle['btn-link-privacy']}>
                    <span>Terms and Policies</span>
                </Link>
            </li>
            <li className="">
                <Link to="/" className={FooterStyle['btn-link-privacy']}>
                    <span>Do Not Sell My Info</span>
                </Link>
            </li>
            <li className="">
                <Link to="/" className={FooterStyle['btn-link-privacy']}>
                    <span>AdChoices</span>
                </Link>
            </li>
        </ul>
    );
}
