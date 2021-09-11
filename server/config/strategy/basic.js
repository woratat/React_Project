const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcrypt');
const connect = require('../database');


module.exports = () => {
    passport.use(new BasicStrategy((username, password, done) => {
        try {
            const sql_check = "SELECT password FROM accounts WHERE username = ?";
            const [check] = await connect.execute(connect.format(sql_check, [username]));

            if (check.length === 0 || check.length >= 2) {
                return done(null, {
                    error: true,
                    message: 'Invalid username or password'
                });
            } else {
                if (!bcrypt.compareSync(password, check[0].password)) {
                    return done(null, {
                        error: true,
                        message: 'Invalid username or password'
                    });
                } else {
                    const sql_user = "SELECT account_id AS id, username FROM accounts WHERE username = ?";
                    const [user] = await connect.execute(connect.format(sql_user, [username]));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }));
}