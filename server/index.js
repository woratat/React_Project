const express = require('./config/express');
require('dotenv').config();

// config port
const port = process.env.PORT || 5050;

// config app
const app = express();

app.listen(port);