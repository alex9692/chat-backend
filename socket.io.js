const express = require('express');
const http = require('http');
const server = http.createServer(express());
const io = require('socket.io')(server);
const User = require('./models/user.model.js');
const Message = require('./models/message.model.js');

server.listen(5001, () => {
  console.log('socket.io running in PORT: 5001');
});

io.on('connection', function(socket) {
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  socket.on('connection-established', async function(data) {
    const user = await User.findById(data);
    console.log('User connected ' + user.username);
    socket.on('disconnect', function() {
      console.log('User disconnected' + user.username);
    });
  });
  socket.on('get-message-id', async function(id) {
    const message = await Message.findById(id)
      .populate('user')
      .populate('lobby');

    io.emit('get-new-message', { message });
  });
});
