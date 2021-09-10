import React from 'react';

// component
import NavPolicy from './NavPolicy';
import LinkFooter from './LinkFooter';
import ItemNavFooter from './ItemNavFooter';
import ItemFollowFooter from './ItemFollowFooter';

// scss module
import FooterStyle from '../assets/scss/footer.module.scss';

export default function Footer() {
    return (
        <footer className={FooterStyle.footer}>
            <div className={FooterStyle['item-footer']}>
                <LinkFooter title="Help">
                    <ItemNavFooter toLink="/" nameLink="About" />
                    <ItemNavFooter toLink="/" nameLink="What the Movie king" />
                </LinkFooter>
                <LinkFooter title="Critic Submission">
                    <ItemNavFooter toLink="/" nameLink="Licensing" />
                    <ItemNavFooter toLink="/" nameLink="Advertise" />
                </LinkFooter>
                <LinkFooter title="Follow us">
                    <ItemFollowFooter toLink="/" nameLink="Facebook" nameIcon="bx bxl-facebook-circle" color="facebook-icon" />
                    <ItemFollowFooter toLink="/" nameLink="Twitter" nameIcon="bx bxl-twitter" color="twitter-icon" />
                    <ItemFollowFooter toLink="/" nameLink="Instagram" nameIcon="bx bxl-instagram" color="instagram-icon" />
                </LinkFooter>
            </div>
            <div className={FooterStyle['copy-right']}>
                <div className="cr-left">
                    <small className="">Copyright © Fandango. All rights reserved.</small>
                </div>
                <div className="cr-right">
                    <NavPolicy />  
                </div>
            </div>
        </footer>
    );
}
