const express = require('express');
const cors = require('express');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const connect = require('../../config/database');

const route = express.Router();
const corsOption = {
    origin: 'http://localhost:3000',
    methods: ['PUT'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
}

route.use(cors(corsOption));
route.put('/:token', (req, res) => {
    const token = req.params.token;
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
        jwt.verify(token, 'id_key_comment', {algorithms:['HS512']}, async (error, decode) => {
            if(error){
                throw error
            }else{
                const comment_id = decode.comment_id;
                if(!comment_id){
                    return res.status(400).json({
                        message: 'Comment id not found.'
                    })
                }else{
                    const message = req.body.message;
                    if(!message){
                        return res.status(400).json({
                            message: 'Please enter new comment.'
                        })
                    }else{
                        try {
                            const sql = "UPDATE comment_data SET message = ? WHERE comment_id = ?";
                            const [result] = await connect.execute(sql, [message, comment_id]);
                            if(result.changedRows == 1){
                                return res.status(200).json({
                                    message: 'Update comment successfully.'
                                })
                            }
                        } catch (error) {
                            throw new Error(error);
                        }
                    }
                }
            }
        })
    }
})

module.exports = route;