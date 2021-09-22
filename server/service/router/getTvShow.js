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
        const rows = await getTvShow();

        if (rows) {
            const result = await setToken(rows);
            return res.status(200).json(result);
        }
    } else {
        const rows = await getTvShowSearch(name);

        if (rows) {
            const result = await setToken(rows);
            return res.status(200).json(result);
        }
    }
});

const getTvShow = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const sql = "SELECT tv_id, tv_name, tv_image, tv_detail, tv_like, tv_creator, tv_link, tv_star FROM tv_show";
            const [shows] = await connect.execute(sql);

            return resolve(shows);
        } catch (error) {
            return reject(error);
        }
    });
}

const getTvShowSearch = (name) => {
    return new Promise( async (resolve, reject) => {
        try {
            const sql = "SELECT tv_id, tv_name, tv_image, tv_detail, tv_like, tv_creator, tv_link, tv_star FROM tv_show WHERE tv_name LIKE ?";
            const [shows] = await connect.execute(connect.format(sql, [name + '%']));

            return resolve(shows);
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
                    tv_creator: value.tv_creator,
                    tv_link: value.tv_link,
                    tv_star: value.tv_star
                }
            });

            return resolve(newData);
        } else {
            return reject(new Error('Data only array'));
        }
    });
}

module.exports = route;