const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const projectRouter = require('./project/projectRouter');
const actionsRouter = require('./actions/actionsRouter');

const server = express();

const http = require('http').createServer(server);
const io = require('socket.io')(http);

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

module.exports = server;
