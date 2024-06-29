const express = require('express');
const { httpGetAllUsers } = require('../controllers/users.controller');
const usersRouter = express.Router();

usersRouter.get('/users', httpGetAllUsers);

module.exports = usersRouter;