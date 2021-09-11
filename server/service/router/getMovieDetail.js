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
route.get('/:id', (req, res) => {
    const token = req.params.id;

    if (!token) {
        return res.status(400).json({
            message: 'Error token not fount'
        });
    }

    if (!validator.isJWT(token)) {
        return res.status(400).json({
            message: 'Error token not fount'
        });
    } else {
        jwt.verify(token, 'id_key_movie', { algorithms: ['HS512'] }, async (err, decode) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                    message: 'Error token verify'
                });
            } else {
                const { movie_id } = decode;

                if (!movie_id || movie_id === undefined) {
                    return res.status(400).json({
                        message: 'data token not fount'
                    });
                } else {
                    try {
                        const rows = await getDetailMovie(movie_id);

                        if (rows) {
                            const result = await setToken(rows);
                            return res.status(200).json(result);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        });
    }
});

const getDetailMovie = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM movie WHERE movie_id = ?";
            const [movie] = await connect.execute(sql, [id]);

            return resolve(movie);
        } catch (error) {
            return reject(error);
        }
    });
}

const setToken = (data) => {
    return new Promise((resolve, reject) => {
        if (Array.isArray(data)) {
            const newData = data.map((value) => {
                return {
                    movie_id: jwt.sign({ movie_id: value.movie_id }, 'id_key_movie', { algorithm: 'HS512' }),
                    movie_name: value.movie_name,
                    movie_image: value.movie_image,
                    movie_detail: value.movie_detail,
                    movie_like: value.movie_like,
                    movie_link: value.movie_link
                }
            });

            return resolve(newData);
        } else {
            return reject(new Error('Data only array'))
        }
    });
}

module.exports = route;