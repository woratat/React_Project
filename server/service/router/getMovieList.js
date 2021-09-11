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
route.get('/', async (req, res) => {
    const name = validator.trim(req.query.w);

    if (name === null || name === 'all') {
        const rows = await getAllMovie();

        if (rows) {
            const result = await setToken(rows);
            return res.status(200).json(result);
        }
    } else {
        const rows = await getMovieSearch(name);

        if (rows) {
            const result = await setToken(rows);
            return res.status(200).json(result);
        }
    }
});

const getAllMovie = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const sql = "SELECT movie_id, movie_name, movie_image, movie_detail, movie_like FROM movie";
            const [movie] = await connect.execute(sql);

            return resolve(movie);
        } catch (error) {
            return reject(error);
        }
    });
}

const getMovieSearch = (name) => {
    return new Promise( async (resolve, reject) => {
        try {
            const sql = "SELECT movie_id, movie_name, movie_image, movie_detail, movie_like FROM movie WHERE movie_name LIKE ?";
            const [movie] = await connect.execute(connect.format(sql, [name + '%']));

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
                    movie_like: value.movie_like
                }
            });

            return resolve(newData);
        } else {
            return reject(new Error('Data only array'));
        }
    });
}

module.exports = route;