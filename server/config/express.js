const express = require('express');
const passport = require('../config/passport');
const flash = require('connect-flash');

// config app
const app = express();

// route
const getUser = require('../service/auth/login');
const checkUser = require('../service/auth/user');
const getMovieList = require('../service/router/getMovieList');
const getMovieDetail = require('../service/router/getMovieDetail');
const getCarousel = require('../service/router/getCarousel');
const getFavorite = require('../service/router/getMovieFavorite');
const postFavorite = require('../service/router/postMovieFavorite');
const deleteFavorite = require('../service/router/deleteMovieFavorite');
const postComment = require('../service/router/postComment');
const updateComment = require('../service/router/updateComment');
const getTvShow = require('../service/router/getTvShow');


module.exports = () => {
    passport();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(flash());

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

    app.use('/api/auth/user', getUser);
    app.use('/api/auth/check', checkUser);
    app.use('/api/get/movieList', getMovieList);
    app.use('/api/get/movieDetail', getMovieDetail);
    app.use('/api/get/carousel', getCarousel);
    app.use('/api/get/favorite', getFavorite);
    app.use('/api/post/favorite', postFavorite);
    app.use('/api/post/comment', postComment);
    app.use('/api/update/comment', updateComment);
    app.use('/api/get/tvShow', getTvShow);
    app.use('/api/delete/favorite', deleteFavorite);

    return { listen };
}