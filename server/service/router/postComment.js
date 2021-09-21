const express = require('express');
const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const connect = require('../../config/database');

const route = express.Router();
const corsOption = {
    origin: 'http://localhost:3000',
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
}

module.exports = (io) => {
    route.use(cors(corsOption));
    route.post('/', passport.authenticate('bearer', { session: false }), (req, res) => {
        if (!req.user) {
            return res.status(400).json({
                message: req.flash('message')
            });
        } else {
            const token = req.body.token;

            if (!token) {
                return res.status(400).json({
                    message: 'Error token not fount'
                });
            } else if (!validator.isJWT(token)) {
                return res.status(400).json({
                    message: 'Error token not fount'
                });
            } else {
                jwt.verify(token, 'id_key_movie', { algorithms: ['HS512'] }, async (err, decode) => {
                    if (err) {
                        console.log(error);
                    } else {
                        const { movie_id } = decode;
                        const { id, username } = req.user;

                        const message = validator.trim(req.body.message);

                        if (validator.isEmpty(message)) {
                            return res.status(400).json({
                                message: 'Please enter message'
                            });
                        } else {
                            try {
                                const sql = "INSERT INTO comment_data (account_id, movie_id, comment_message) VALUES (?,?,?)";
                                const [result] = await connect.execute(sql, [id,movie_id,message]);

                                if (result) {
                                    // io.sockets.emit('new-message', {
                                    //     movie_id: movie_id,
                                    //     username: username,
                                    //     comment_reply: 0,
                                    //     message: message
                                    // });

                                    return res.status(200).json({
                                        movie_id: movie_id,
                                        username: username,
                                        comment_reply: 0,
                                        message: message
                                    });
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                });
            }
        }
    });

    return route;
}