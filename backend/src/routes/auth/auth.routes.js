const express = require('express');
const { httpRegisterUser, httpLoginUser } = require('./users.controller');
const authRouter = express.Router();

authRouter.post('/register', httpRegisterUser);
authRouter.post('/login', httpLoginUser);

module.exports = authRouter;