const express = require('express');
const { httpGetAllProjects, httpCreateProject, httpUpdateProject, httpDeleteProject, httpGetProjectsByUser } = require('./projects.controller');
const authenticateToken = require('../../middleware/auth.middleware');
const projectsRouter = express.Router();

projectsRouter.get('/projects', authenticateToken, httpGetAllProjects);
projectsRouter.post('/projects', authenticateToken, httpCreateProject);
projectsRouter.put('/projects/:id', authenticateToken, httpUpdateProject);
projectsRouter.delete('/projects/:id', authenticateToken, httpDeleteProject);
projectsRouter.get('/usuario/:id/projects', authenticateToken, httpGetProjectsByUser);

module.exports = projectsRouter;