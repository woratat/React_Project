const express = require('express');
const cors = require('express');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const connect = require('../../config/database');

const route = express.Router();
const corsOption = {
    origin: 'http://localhost:3000',
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
}

route.use(cors(corsOption));
route.post('/:token', async (req, res) => {
    const token = req.params.token;

    if (!token) {
        return res.status(400).json({
            message: 'Token not fount'
        });
    }

    if (!validator.isJWT(token)) {
        return res.status(400).json({
            message: 'Invalid Token'
        });
    } else {
        const token_movie = req.body.token_movie;

        if (!token_movie) {
            return res.status(400).json({
                message: 'Token not fount'
            });
        }

        if (!validator.isJWT(token_movie)) {
            return res.status(400).json({
                message: 'Invalid Token'
            });
        } else {
            try {
                const account = jwt.verify(token, 'id_key_account', { algorithms: ['HS512'] });
                const movie = jwt.verify(token_movie, 'id_key_movie', { algorithms: ['HS512'] });

                const { account_id } = account;
                const { movie_id } = movie;

                if (!account_id || !movie_id) {
                    return res.status(200).json({
                        message: 'ID and movie ID not fount'
                    });
                } else {
                    const sql = "INSERT INTO favorite (account_id, movie_id) VALUES (?,?)";
                    const [result] = await connect.execute(sql, [account_id, movie_id]);
                    
                    if (result) {
                        return res.status(201).json({
                            message: 'Add movie successfully'
                        });
                    }
                }
            } catch (error) {
                new Error(error);
            }
        }
    }
});

module.exports = route;