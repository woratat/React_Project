const express = require('express');
const cors = require('cors');
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
    const name = req.query.name;

    try {
        const sql = "SELECT * FROM movie WHERE movie_name LIKE ?";
        const [row] = await connect.execute(connect.format(sql, [name + '%']));
        
        if (row.length === 0) {
            return res.status(200).json({
                message: 'movie not found'
            });
        } else {
            const result = await setToken(row);
            return res.status(200).json(result);
        }
    } catch (error) {
        
    }
});

const setToken = (data) => {
    return new Promise((resolve, reject) => {
        if (Array.isArray(data)) {
            const newData = data.map((value) => {
                return {
                    movie_id: jwt.sign({ movie_id: value.movie_id }, 'id_key_movie', { algorithm: 'HS512' }),
                    movie_name: value.movie_name,
                    movie_image: value.movie_image,
                }
            });

            return resolve(newData);
        } else {
            return reject(new Error('Data only array'));
        }
    });
}

module.exports = route;