import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import axios from 'axios';

function Carousel({ className }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        getImage();
    }, []);

    const getImage = async () => {
        try {
            const res = await axios.get('http://localhost:5050/api/get/carousel', {
                timeout: 2000,
            });

            console.log(res.data);
            setImages(res.data);
        } catch (error) {
            if (error.response) {
                console.error(error.response.message);
            }
        }
    }

    useEffect(() => {
        running();
    }, []);

    const running = () => {
        let count = 1;

        setInterval(() => {
            document.getElementById('carousel' + count).checked = true;
            count++;
            if (count > 4) {
                count = 1;
            }
        }, 7000);
    }

    return (
        <div className={className}>
            <div className="slides">
                <input type="radio" name="btn-image" id="carousel1"  />
                <input type="radio" name="btn-image" id="carousel2" />
                <input type="radio" name="btn-image" id="carousel3" />
                <input type="radio" name="btn-image" id="carousel4" />

                { images.map((image, index) => {
                    return (
                        <div key={image.carousel_id} className={index === 0 ? 'image-slide active-image' : 'image-slide'}>
                            <img src={require(`../assets/images/${image.image_name}`).default} alt="movie carousel" />                        
                        </div>
                    );
                }) }

                <div className="navigation-manual">
                    <label htmlFor="radio1" className="manual-btn" onClick={() => { document.getElementById('carousel1').checked = true }} />
                    <label htmlFor="radio2" className="manual-btn" onClick={() => { document.getElementById('carousel2').checked = true }} />
                    <label htmlFor="radio3" className="manual-btn" onClick={() => { document.getElementById('carousel3').checked = true }} />
                    <label htmlFor="radio4" className="manual-btn" onClick={() => { document.getElementById('carousel4').checked = true }} />
                </div>
            </div>
        </div>
    );
}

Carousel.propTypes = {
    className: PropTypes.string.isRequired
}

export default styled(Carousel)`
    width: 1200px;
    height: 500px;
    border-radius: 10px;
    overflow: hidden;

    .slides{
        width: 500%;
        height: 500px;
        display: flex;
    }

    .slides input {
        display: none;
    }

    .image-slide {
        width: 20%;
        transition: 2s;
    }

    .image-slide img {
        width: 100%;
        height: 100%;
    }

    .navigation-manual {
        position: absolute;
        width: 1200px;
        transform: translateY(28rem);
        display: flex;
        justify-content: center;
    }

    .manual-btn {
        border: 2px solid #ffffff;
        padding: 5px;
        border-radius: 10px;
        cursor: pointer;
        transition: 1s;
    }

    .manual-btn:not(:last-child){
        margin-right: 2rem;
    }

    .manual-btn:hover{
        background: #ffffff;
    }

    #carousel1:checked ~ .navigation-manual label[for="radio1"] {
        background-color: #ffffff;
    }

    #carousel2:checked ~ .navigation-manual label[for="radio2"] {
        background-color: #ffffff;
    }
    
    #carousel3:checked ~ .navigation-manual label[for="radio3"] {
        background-color: #ffffff;
    }

    #carousel4:checked ~ .navigation-manual label[for="radio4"] {
        background-color: #ffffff;
    }
    
    #carousel1:checked ~ .active-image {
        margin-left: 0;
    }

    #carousel2:checked ~ .active-image {
        margin-left: -20%;
    }

    #carousel3:checked ~ .active-image {
        margin-left: -40%;
    }

    #carousel4:checked ~ .active-image {
        margin-left: -60%;
    }
`;


