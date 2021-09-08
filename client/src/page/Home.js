import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useBody } from '../use'

// component
import Footer from '../component/Footer';

export default function Home() {
    const [page] = useState({
        title: '',
        body: ''
    });

    useBody(page.body);

    return (
        <HelmetProvider>
            <Helmet>
                <title>{ page.title }</title>
            </Helmet>
            <Footer />
        </HelmetProvider>
    )
}
