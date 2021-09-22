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
        jwt.verify(token, 'id_key_tv', { algorithms: ['HS512'] }, async (err, decode) => {
            if (err) {
                console.log(err);
            } else {
                const { tv_id } = decode;

                try {
                    const sql = "SELECT comment_tv.comment_id AS comment_id, comment_tv.tv_id AS tv_id, account.username AS username, comment_tv.account_id_reply AS comment_reply, comment_tv.comment_message AS message FROM comment_tv INNER JOIN account ON comment_tv.account_id = account.account_id WHERE comment_tv.tv_id = ?";
                    const [result] = await connect.execute(sql, [tv_id]);

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