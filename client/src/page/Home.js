import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useBody } from '../use'

// component
import Header from '../component/Header';
import Main from '../component/MainHome';
import Footer from '../component/Footer';

export default function Home() {
    const [page] = useState({
        title: '',
        body: 'page-home'
    });

    useBody(page.body);

    return (
        <HelmetProvider>
            <Helmet>
                <title>{ page.title }</title>
            </Helmet>
            <Header/>
            <Main>
                <div>
                    
                </div>
            </Main>
            <Footer />
        </HelmetProvider>
    );
}
