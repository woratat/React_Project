const express = require('express');
const cors = require('cors');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const connect = require('../../config/database');

const route = express.Router();
const corsOption = {
    origin: 'http://localhost:3000',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
}

route.use(cors(corsOption));
route.get('/:token', (req, res) => {
    const token = req.params.token;

    if (!token) {
        return res.status(400).json({
            message: 'Error token not fount'
        });
    } if (!validator.isJWT(token)) {
        return res.status(400).json({
            message: 'Error token not fount'
        });
    } else {
        jwt.verify(token, 'id_key_movie', { algorithms: ['HS512'] }, async (err, decode) => {
            if (err) {
                console.log(error);
            } else {
                const { movie_id } = decode;

                try {
                    const sql = "SELECT comment_data.comment_id AS comment_id, comment_data.movie_id AS movie_id, account.username AS username, comment_data.account_id_reply AS comment_reply, comment_data.comment_message AS message FROM comment_data INNER JOIN account ON comment_data.account_id = account.account_id WHERE comment_data.movie_id = ?";
                    const [result] = await connect.execute(sql, [movie_id]);

                    if (result) {
                        return res.status(200).json(result);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }
});

module.exports = route;