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
        <footer>
            <div className="item-footer">
                <LinkFooter title="help">
                    <ItemNavFooter toLink="/" nameLink="" />
                    <ItemNavFooter toLink="/" nameLink="" />
                </LinkFooter>
                <LinkFooter title="Critic Submission">
                    <ItemNavFooter toLink="/" nameLink="" />
                    <ItemNavFooter toLink="/" nameLink="" />
                </LinkFooter>
                <LinkFooter title="follow us">
                    <ItemFollowFooter toLink="/" nameLink="" nameIcon="" />
                    <ItemFollowFooter toLink="/" nameLink="" nameIcon="" />
                    <ItemFollowFooter toLink="/" nameLink="" nameIcon="" />
                </LinkFooter>
            </div>
            <div className="copy-right">
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
