const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const projectRouter = require('./project/projectRouter');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
  res.send(`<h2>This works!</h2>`);
});

module.exports = server;
