var crypto = require('crypto');
var config = require('../config');

var key = new Buffer(config.cryptokey, 'base64');
var iv = new Buffer(config.cryptoiv);
var AESCrypt = {};

AESCrypt.decrypt = function(encryptdata) {
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    return Buffer.concat([
        decipher.update(new Buffer(encryptdata, "base64")),
        decipher.final()
    ]).toString();
}

module.exports = AESCrypt;