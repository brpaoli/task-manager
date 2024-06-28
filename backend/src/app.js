const express = require('express');
const cors = require('cors');
const projectsRouter = require('./routes/projects/projects.router')

const app = express();

//Para aceitar requisições cross origins do frontend;
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

app.use(projectsRouter);

module.exports = app;