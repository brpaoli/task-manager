const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const authRouter = require('./routes/auth.routes');
const tasksRouter = require('./routes/tasks.router');
const usersRouter = require('./routes/users.router');
const projectsRouter = require('./routes/projects.router');


const app = express();
app.use(helmet());

//Para aceitar requisições cross origins do frontend;
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

app.use(projectsRouter);
app.use(tasksRouter);
app.use(usersRouter);
app.use('/auth', authRouter);


module.exports = app;