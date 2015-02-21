// Nodejs encryption with CTR
var crypto = require('crypto'),

module.exports.decrypt = function (text) {
var decipher = crypto.createDecipher('aes-256-cbc','test');
var dec = decipher.update(text,'plaintext','utf8');
dec += decipher.final('utf8');
return dec;
} 