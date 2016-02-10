var env = 'local';  //@todo logic to switch environments here
var config = require('./config.' + env + '.json');
config.env = env;

module.exports = config;
