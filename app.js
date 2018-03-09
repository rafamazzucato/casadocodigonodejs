var ip = 'localhost';
var port = 3000;

var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io',io);

http.listen(port,function(){
    console.log('Servidor Express Executando');
});