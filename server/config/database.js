const mysql = require('mysql2');
const bluebird = require('bluebird');
const config = require('./userData');

const connect = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    Promise: bluebird 
});

connect.connect((err) => {
    if (err) throw err;
});

module.exports = connect.promise();