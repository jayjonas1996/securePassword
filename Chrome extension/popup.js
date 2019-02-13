var main_div = document.getElementById("main")
/*
var imported = document.createElement('script');
imported.src = 'qrcode/qrcode.js';
imported.type = "text/javascript"
document.head.appendChild(imported);

var imported2 = document.createElement('script');
imported2.src = 'qrcode/jquery.min.js';
imported2.type = "text/javascript"
document.head.appendChild(imported2);
*/
chrome.tabs.query({active: true, currentWindow: true}, function(arrTabs) {
console.log(arrTabs)
console.log(arrTabs[0].url.split('/')[2])
        //var sio = new io.Socket();
        var id = ""
        var socket = io.connect('http://127.0.0.1:3000'); 
        
        var temp = getKeyAndIV();
        temp.key = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa="
        temp.iv = "aaaaaaaaaaaaaaaaaaaaaa=="
console.log(temp.key.toString().length)
console.log(temp.iv.toString().length)

        var codedata = {
            key: temp.key,
            iv: temp.iv,
            url: arrTabs[0].url.split('/')[2],
            id: ""
        }
        

        console.log(codedata)
            
            socket.on('id',function(data){
                codedata.id = data.id
                console.log("id: "+data)
                makeQRcode(codedata)
               
            });
            socket.on('cipherdata',function(data){
		
		// please generate new different keys and IV here for everytime popup appears
                var aes = new AES("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa=",{iv:"aaaaaaaaaaaaaaaaaaaaaa=="})
                aes.keyExpand()
                console.log("encrypted paylload",data)
                aes.setCipher(data.data.base64Cipher)
                aes.decrypt()

                var pt = aes.getPlaintext()
                console.log("plaintext",pt)

                pt = pt.substring(0,10)
                



                chrome.tabs.sendMessage(arrTabs[0].id, {pass: pt,username: data.data.username}, function(response) {
                    console.log("sent");
                  });

                
                    
            });

            


        
        
     
        


    socket.on('disconnect',function(){
        qrcode.clear()
    });
});










var makeQRcode = function(data){
        console.log("\nmaking qrcode\n")
        console.log(data)
        var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: data.url+";"+data.key+";"+data.iv+";"+data.id,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
        });
    
        console.log("code made: ")
}

var getKeyAndIV = function() {

    var keyBitLength = 256;
    var ivBitLength = 128;
    var iterations = 234;

    var password = makestring()

    var bytesInSalt = 128 / 8;
    var salt = CryptoJS.lib.WordArray.random(bytesInSalt);

    var iv128Bits = CryptoJS.PBKDF2(password, salt, { keySize: 128 / 32, iterations: iterations });
    var key256Bits = CryptoJS.PBKDF2(password, salt, { keySize: 256 / 32, iterations: iterations });
console.log(CryptoJS.enc.Base64.stringify( iv128Bits))
console.log(CryptoJS.enc.Base64.stringify( key256Bits))
    return {
        iv: CryptoJS.enc.Base64.stringify( iv128Bits),
        key: CryptoJS.enc.Base64.stringify( key256Bits)//)
    };
};


function makestring() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }