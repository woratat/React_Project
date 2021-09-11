import React from 'react';

// scss 
import FooterStyle from '../assets/scss/footer.module.scss';

export default function LogoFooter() {
    return (
        <div className={FooterStyle['component-footer']}>
            <div className={FooterStyle['title-footer-item']}>
                <span>Movie King</span>
            </div>
            <div className={FooterStyle['link-footer-item']}>
                <span className={FooterStyle['color-content']}>Movie king is a collection of new movies for movie critics to talk and explain about movies</span>
            </div>
        </div>
    )
}
