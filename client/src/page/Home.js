import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useBody } from '../use'

// component
import Footer from '../component/Footer';
import Header from '../component/Header';

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
            <div>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam labore, ut beatae autem aliquam nihil exercitationem dolor nobis id, delectus accusamus dolores architecto dicta facere porro, aliquid modi totam?
                </div>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam labore, ut beatae autem aliquam nihil exercitationem dolor nobis id, delectus accusamus dolores architecto dicta facere porro, aliquid modi totam?
                </div>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam labore, ut beatae autem aliquam nihil exercitationem dolor nobis id, delectus accusamus dolores architecto dicta facere porro, aliquid modi totam?
                </div>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam labore, ut beatae autem aliquam nihil exercitationem dolor nobis id, delectus accusamus dolores architecto dicta facere porro, aliquid modi totam?
                </div>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam labore, ut beatae autem aliquam nihil exercitationem dolor nobis id, delectus accusamus dolores architecto dicta facere porro, aliquid modi totam?
                </div>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam labore, ut beatae autem aliquam nihil exercitationem dolor nobis id, delectus accusamus dolores architecto dicta facere porro, aliquid modi totam?
                </div>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam labore, ut beatae autem aliquam nihil exercitationem dolor nobis id, delectus accusamus dolores architecto dicta facere porro, aliquid modi totam?
                </div>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam labore, ut beatae autem aliquam nihil exercitationem dolor nobis id, delectus accusamus dolores architecto dicta facere porro, aliquid modi totam?
                </div>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam labore, ut beatae autem aliquam nihil exercitationem dolor nobis id, delectus accusamus dolores architecto dicta facere porro, aliquid modi totam?
                </div>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam labore, ut beatae autem aliquam nihil exercitationem dolor nobis id, delectus accusamus dolores architecto dicta facere porro, aliquid modi totam?
                </div>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam labore, ut beatae autem aliquam nihil exercitationem dolor nobis id, delectus accusamus dolores architecto dicta facere porro, aliquid modi totam?
                </div>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam labore, ut beatae autem aliquam nihil exercitationem dolor nobis id, delectus accusamus dolores architecto dicta facere porro, aliquid modi totam?
                </div>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam labore, ut beatae autem aliquam nihil exercitationem dolor nobis id, delectus accusamus dolores architecto dicta facere porro, aliquid modi totam?
                </div>
            </div>
            <Footer />
        </HelmetProvider>
    );
}
