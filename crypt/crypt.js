// Nodejs encryption with CTR
var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';

module.exports.decrypt = function (text) {
var decipher = crypto.createDecipher('aes-256-ctr','d6F3Efeq');
var dec = decipher.update(text,'plaintext','utf8');
dec += decipher.final('utf8');
return dec;
} 