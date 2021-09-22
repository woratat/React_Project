const express = require('express');
const cors = require('cors');
const http = require('http');
const passport = require('../config/passport');
const flash = require('connect-flash');

const { Server } = require("socket.io");

// config app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }
});

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
const getSerieDetail = require('../service/router/getSerieDetail');
const getComment = require('../service/router/getComment');
const deleteComment = require('../service/router/deleteComment');
const postCommentReply = require('../service/router/postCommentReply');


module.exports = () => {
    passport();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(flash());
    app.use(cors());

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
        server.listen(port, () => {
            console.log(`server running on port ${port}`);
        });
    }

    io.sockets.on('connection', (socket) => {
        socket.on('room', (room) => {
            socket.join(room);
            socket.on('sand-message', (message) => {
                io.sockets.in(room).emit('message', message);
            });

            socket.on('sand-update', (message) => {
                io.sockets.in(room).emit('message-update', message);
            });

            socket.on('sand-delete', (message) => {
                io.sockets.in(room).emit('message-delete', message);
            })
        });
    });

    app.use('/api/auth/user', getUser);
    app.use('/api/auth/check', checkUser);
    app.use('/api/get/movieList', getMovieList);
    app.use('/api/get/movieDetail', getMovieDetail);
    app.use('/api/get/carousel', getCarousel);
    app.use('/api/get/favorite', getFavorite);
    app.use('/api/post/favorite', postFavorite);
    app.use('/api/post/comment', postComment(io));
    app.use('/api/update/comment', updateComment);
    app.use('/api/get/tvShow', getTvShow);
    app.use('/api/delete/favorite', deleteFavorite);
    app.use('/api/get/serieDetail', getSerieDetail);
    app.use('/api/get/comment', getComment);
    app.use('/api/delete/comment', deleteComment);
    app.use('/api/post/comment_reply', postCommentReply);

    return { listen };
}