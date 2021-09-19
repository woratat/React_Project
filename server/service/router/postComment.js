const express = require('express');
const cors = require('cors');
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
route.post('/', (req, res) =>{
    const token = req.body.token;
    if(!token){
        return res.status(400).json({
            message: 'Token not found.'
        })
    }

    if(!validator.isJWT(token)){
        return res.status(400).json({
            message: 'Token not found.'
        })
    }else{
        jwt.verify(token, 'id_key_account', {algorithms:['HS512']}, async (error, decode) =>{
            if(error){
                throw error
            }else{
                const {account_id} = decode;
                if(!account_id){
                    return res.status(400).json({
                        message: 'ID not found'
                    })
                }else{
                    const message = req.body.message;
                    if(!message){
                        return res.status(400).json({
                            message: 'Please enter comment.'
                        })
                    }else{
                        try {
                            const sql = "INSERT INTO comment_data (account_id, comment_message) VALUES (?,?)";
                            const [result] = await connect.execute(sql, [account_id, message]);
                            if(result){
                                return res.status(201).json({
                                    message: 'Comment successfully.'
                                })
                            }
                        } catch (error) {
                            throw new Error(error)
                        }
                    }
                }
            }
        });
    }
})

module.exports = route;