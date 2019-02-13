var CryptoJS = require('crypto-js')
var getKeyAndIV = function() {

    var keyBitLength = 256;
    var ivBitLength = 128;
    var iterations = 234;

    var password = makestring()

    var bytesInSalt = 128 / 8;
    var salt = CryptoJS.lib.WordArray.random(bytesInSalt);

    var iv128Bits = CryptoJS.PBKDF2(password, salt, { keySize: 128 / 32, iterations: iterations });
    var key256Bits = CryptoJS.PBKDF2(password, salt, { keySize: 256 / 32, iterations: iterations });

    return {
        iv: iv128Bits,
        key: key256Bits
    };
};


function makestring() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }