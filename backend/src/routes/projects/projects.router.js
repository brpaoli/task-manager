const express = require('express');
const { getAllProjects } = require('./projects.controller');
const projectsRouter = express.Router();

projectsRouter.get('/projects', getAllProjects);

module.exports = projectsRouter;