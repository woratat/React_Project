const express = require('express');
const cors = require('express');
const connect = require('../../config/database');

const route = express.Router();
const corsOption = {
    origin: 'http://localhost:3000',
    methods: ['DELETE'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
}

route.use(cors(corsOption));
route.delete('/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            message: 'Error id not found'
        });
    } else {
        try {
            const sql = "SELECT comment_id FROM comment_data WHERE account_id_reply = ? OR comment_id = ?";
            const [result] = await connect.execute(sql, [id, id]);

            if (result.length === 0) {
                return res.status(200).json({
                    message: 'post not found'
                });
            } else {
                const comment_id = result.map((val) => {
                    return val.comment_id;
                });
                const str_comment_id = comment_id.join(',');
                
                const sql_delete = "DELETE FROM comment_data WHERE comment_id IN (?)";
                const [row] = await connect.execute(sql_delete, [str_comment_id]);

                if (row) {
                    return res.status(200).json({
                        message: 'Delete post successfully',
                        comment_id: id
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = route;