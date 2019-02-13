var CryptoJS = require('crypto-js'); 
var express = require('express');
var socket = require('socket.io');
var bodyParser = require('body-parser')
//var generator = require('model.js')
var app = express()
var server = app.listen(3000, function(){
    console.log('Listening on 3000\n');
});
var io = socket(server);

app.use(bodyParser.json());






app.get('/connect',function(req,res){

});

app.post('/sendcipher', function(req,res){
   
    var data = req.body;
    console.log(req.body)
    
    io.to(data.id).emit('cipherdata',{data})

    res.send("----Okay----")
})






io.on('connection', function(socket){

    console.log(socket.id+"  connected")

    socket.emit('id',{id: socket.id}); 

});
io.on('disconnect', function(socket){

    console.log(socket.id+" disconnected\n")

    

});



io.of("/sendcipher").on("connection", function (socket) {
    
    console.log(socket.id+'connected')

    socket.on('new_message', function(data){
         
        console.log('socket receive')

    })
    
});