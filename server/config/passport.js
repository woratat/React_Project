// strategy
const basic = require('./strategy/basic');
const bearer = require('./strategy/bearer');

module.exports = () => {
    basic();
    bearer();
}