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
        
    }
});

module.exports = route;