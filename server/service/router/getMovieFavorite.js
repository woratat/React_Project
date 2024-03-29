const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const connect = require('../../config/database');

const route = express.Router();
const corsOption = {
    origin: 'http://localhost:3000',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
}

route.use(cors(corsOption));
route.get('/', (req, res) => {
    const token = req.query.token;

    if (!token) {
        return res.status(400).json({
            message: 'Token not fount'
        });
    }
    if (!validator.isJWT) {
        return res.status(200).json({
            message: 'Invalid Token'
        });
    } else {
        jwt.verify(token, 'id_key_account', { algorithms: ['HS512'] }, async (err, decode) => {
            if (err) throw err;

            const { id } = decode;

            if (!id) {
                return res.status(400).json({
                    message: 'ID not fount'
                });
            } else {
                try {
                    const sql = "SELECT favorite.favorite_id AS favorite_id, movie.movie_image AS movie_image, movie.movie_name AS movie_name, favorite.movie_id AS movie_id FROM favorite INNER JOIN movie ON favorite.movie_id = movie.movie_id WHERE account_id = ? ORDER BY favorite_id DESC";
                    const [rows] = await connect.execute(sql, [id]);

                    if (rows) {
                        const result = await setToken(rows);
                        return res.status(200).json(result);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }
});

const setToken = (data) => {
    return new Promise((resolve, reject) => {
        if (Array.isArray(data)) {
            const newData = data.map((value) => {
                return {
                    favorite_id: jwt.sign({ favorite_id: value.favorite_id }, 'id_key_favorite', { algorithm: 'HS512' }),
                    movie_id: jwt.sign({ movie_id: value.movie_id }, 'id_key_movie', { algorithm: 'HS512' }),
                    movie_image: value.movie_image,
                    movie_name: value.movie_name
                }
            });

            return resolve(newData);
        } else {
            return reject(new Error('Data only array'));
        }
    });
}

module.exports = route;