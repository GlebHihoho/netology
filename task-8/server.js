// Setup basic express server

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname));

io.on('connection', socket => {

  socket.on('new message', data => {
    data.id = socket.id;
    io.sockets.emit('message', data);
  });

  socket.broadcast.emit('user joined', {
      username: socket.id,
  });

  socket.on('disconnect', () => {
    io.sockets.emit('disc', socket.id);
  });

});
