const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('line', function(color, mouseX, mouseY, pmouseX, pmouseY) {
    io.emit('line', color, mouseX, mouseY, pmouseX, pmouseY)
  })
  socket.on('spray', function(color, mouseX, mouseY, pmouseX, pmouseY) {
    io.emit('spray', color, mouseX, mouseY, pmouseX, pmouseY)
  })
  socket.on('brush', function(color, mouseX, mouseY, pmouseX, pmouseY) {
    io.emit('brush', color, mouseX, mouseY, pmouseX, pmouseY)
  })
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});
