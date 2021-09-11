const express = require('express');
const cors = require('cors');
const connect = require('../../config/database');

const route = express.Router();
const corsOption = {
    origin: 'http://localhost:3000',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200 
}

route.use(cors(corsOption));
route.get('/', async (req, res) => {
   try {
       const sql = "SELECT * FROM carousel";
       const [result] = await connect.execute(sql);
       
       return res.status(200).json(result);
   } catch (error) {
       console.log(error);
   } 
});

module.exports = route;