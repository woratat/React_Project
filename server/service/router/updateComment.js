const express = require('express');
const cors = require('express');
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
route.put('/:id', async (req, res) => {
    const id = req.params.id;
    
    if (!id) {
        return res.status(400).json({
            message: 'Error id not found'
        });
    } else {
        const message = validator.trim(req.body.message);

        if (validator.isEmpty(message)) {
            return res.status(400).json({
                message: 'Please enter message'
            });
        } else {
            try {
                const sql = "UPDATE comment_data SET comment_message = ? WHERE comment_id = ?";
                const [result] = await connect.execute(sql, [message, id]);

                if (result.length === 0) {
                    return res.status(200).json({
                        message: `This post doesn't exist anymore`
                    });
                } else {
                    if (result.changedRows) {
                        return res.status(200).json({
                            message: 'Update comment successfully',
                            comment_id: id,
                            message_update: message
                        });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
});

module.exports = route;