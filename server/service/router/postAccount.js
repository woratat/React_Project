const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const validator = require('validator');
const connect = require('../../config/database');

const route = express.Router();
const corsOption = {
    origin: 'http://localhost:3000',
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
};
const saltRounds = 10;

route.use(cors(corsOption));
route.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (validator.isEmpty(username)) {
        return res.status(400).json({
            message: 'Please enter username'
        });
    } else if (validator.isEmpty(password)) {
        return res.status(400).json({
            message: 'Please enter password'
        });
    } else {
        try {
            const sql_check = "SELECT username FROM account WHERE username = ? LIMIT 1";
            const [result] = await connect.execute(sql_check, [username]);

            if (result.length === 1) {
                return res.status(400).json({
                    message: 'Username is already used'
                });
            } else {
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash_password = bcrypt.hashSync(password, salt);

                const sql = "INSERT INTO account (username, password) VALUES (?,?)";
                const [newUser] = await connect.execute(sql, [username, hash_password]);

                if (newUser) {
                    return res.status(200).json({
                        message: 'Sign up successfully'
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = route;