import React from 'react';
import { Link } from 'react-router-dom';

export default function NavPolicy() {
    return (
        <ul>
            <li>
                <Link to="/" className="">
                    <span>Privacy Policy</span>
                </Link>
            </li>
            <li>
                <Link to="/" className="">
                    <span>Terms and Policies</span>
                </Link>
            </li>
            <li>
                <Link to="/" className="">
                    <span>Do Not Sell My Info</span>
                </Link>
            </li>
            <li>
                <Link to="/" className="">
                    <span>AdChoices</span>
                </Link>
            </li>
        </ul>
    );
}
