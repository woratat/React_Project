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
        jwt.verify(token, 'id_key_tv_show', { algorithms: ['HS512'] }, async (err, decode) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                    message: 'Error token verify'
                });
            } else {
                const { tv_id } = decode;

                if (!tv_id || tv_id === undefined) {
                    return res.status(400).json({
                        message: 'data token not fount'
                    });
                } else {
                    try {
                        const rows = await getSerieDetail(tv_id);

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

const getSerieDetail = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM tv_show WHERE tv_id = ?";
            const [serie] = await connect.execute(sql, [id]);

            return resolve(serie);
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
                    tv_id: jwt.sign({ tv_id: value.tv_id }, 'id_key_tv', { algorithm: 'HS512' }),
                    tv_name: value.tv_name,
                    tv_image: value.tv_image,
                    tv_detail: value.tv_detail,
                    tv_like: value.tv_like,
                    tv_link: value.tv_link,
                    tv_director: value.tv_director,
                    tv_writer: value.tv_writer,
                    tv_star: value.tv_star,
                    tv_episodes: value.tv_episodes
                }
            });

            return resolve(newData);
        } else {
            return reject(new Error('Data only array'))
        }
    });
}

module.exports = route;