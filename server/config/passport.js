const passport = require('passport');

// strategy
const basic = require('./strategy/basic');

module.exports = () => {
    basic();
}