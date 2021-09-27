const express = require('express');
const passport = require('passport');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const route = express.Router();
const corsOption = { //บอกว่า request ถูกเรียกจากที่ไหน
    origin: 'http://localhost:3000', 
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
}

route.use(cors(corsOption));
route.get('/', passport.authenticate('bearer', { session: false }), (req, res) => { //ไม่เก็บ session
    console.log(req.user);
    if (!req.user) {
        return res.status(400).json({
            message: req.flash('message') //user not found from bearer
        });
    } else {
        const { id, username } = req.user;
        const token = jwt.sign({ id, username }, 'id_key_account', { algorithm: 'HS512' }); //convert data to token

        return res.status(200).json({
            message: 'login successfully',
            token: token,
            username: username
        });
    }
});

module.exports = route;