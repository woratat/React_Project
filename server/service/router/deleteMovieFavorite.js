const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connect = require('../../config/database');


const route = express.Router();
const corsOption = {
    origin: 'http://localhost:3000',
    methods: ['DELETE'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
}

route.use(cors(corsOption));
route.delete('/', async (req, res) => {
    const token = req.query.w;

    if (!token) {
        return res.status(200).json({
            message: 'Token not fount'
        });
    } else {
        try {
            const decode = jwt.verify(token, 'id_key_favorite', { algorithms: ['HS512'] });

            if (!decode.favorite_id) {
                return res.status(400).json({
                    message: 'ID not fount'
                });
            } else {
                const sql = "DELETE FROM favorite WHERE favorite_id = ?";
                const [result] = await connect.execute(sql, [decode.favorite_id]);

                if (result) {
                    return res.status(200).json({
                        message: 'Remove movie successfully',
                        favorite_id: token
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = route;