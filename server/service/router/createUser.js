const express = require('express');
const cors = require('cors');
const validator = require('validator');
const bcrypt = require('bcrypt');
const connect = require('../../config/database');

const route = express.Router();
const corsOption = {

}

route.use(cors(corsOption));
route.post('/', (req, res) => {
    const username = validator.trim(req.body.username);
    const password = validator.trim(req.body.password);

    if (validator.isEmpty(username)) {
        return res.status(400).json({
            message: 'Please enter username'
        });
    } else if (validator.isEmpty(password)) {
        return res.status(400).json({
            message: 'Please enter password'
        });
    } else {

    }
});

const check_username = (username) => {
    const check = /^[a-zA-Z0-9]{1,}?=*[_-](&?=*[a-zA-Z0-9]{1,})$/;
    return check.test(username);
}

module.exports = route;