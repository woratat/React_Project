import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useBody } from '../use'

// component
import Footer from '../component/Footer';
import Header from '../component/Header';

export default function Home() {
    const [page] = useState({
        title: '',
        body: 'test'
    });

    useBody(page.body);

    return (
        <HelmetProvider>
            <Header/>
            <Helmet>
                <title>{ page.title }</title>
            </Helmet>
        </HelmetProvider>
    );
}
