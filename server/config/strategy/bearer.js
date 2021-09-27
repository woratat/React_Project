const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const connect = require('../database');

module.exports = () => {
    passport.use(new BearerStrategy({ passReqToCallback: true } ,(req, token, done) => {
        try {
            jwt.verify(token, 'id_key_account', { algorithms: ['HS512'] }, async (err, decode) => {  //(key, password token, algorithm, callback()) convert token to object
                if (err) {
                    done(err);
                } else {
                    const { id, username } = decode;

                    const sql = "SELECT COUNT(*) AS count FROM account WHERE account_id = ? AND username = ?";
                    const [result] = await connect.execute(sql, [id, username]);

                    if (result) {
                        if (result[0].count === 0) {
                            done(null, false, req.flash('message', 'User not found')); //done(error, user, info)
                        } else {
                            done(null, {
                                id,
                                username
                            });
                        }
                    }
                }
            });
        } catch (error) {
            done(error);
        }
    }));
}