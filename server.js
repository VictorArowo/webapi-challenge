const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const projectRouter = require('./project/projectRouter');
const actionsRouter = require('./actions/actionsRouter');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>This works!</h2>`);
});

module.exports = server;
