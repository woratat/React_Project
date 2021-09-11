const express = require('express');

// config app
const app = express();

// route
const getMovieList = require('../service/router/getMovieList');
const getMovieDetail = require('../service/router/getMovieDetail');
const getCarousel = require('../service/router/getCarousel');

module.exports = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.get('/', (req, res) => {
        return res.status(200).json({
            name: 'Project React',
            message: 'movie content',
            develop: {
                people_1: 'Woratat Kumklam',
                people_2: 'Ratchapol Thongta',
                people_3: 'Kasira Khyoai'
            }
        });
    });

    const listen = (port) => {
        app.listen(port, () => {
            console.log(`server running on port ${port}`);
        });
    }

    app.use('/api/get/movieList', getMovieList);
    app.use('/api/get/movieDetail', getMovieDetail);
    app.use('/api/get/carousel', getCarousel);

    return { listen };
}