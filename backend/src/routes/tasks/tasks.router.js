const express = require('express');
const { httpGetAllTasks, httpGetTasksByProject, httpSaveNewTask, httpDeleteTask, httpUpdateTask } = require('./tasks.controller');
const authenticateToken = require('../../middleware/auth.middleware');
const tasksRouter = express.Router();

tasksRouter.get('/tasks', authenticateToken, httpGetAllTasks);
tasksRouter.post('/tasks', authenticateToken, httpSaveNewTask);
tasksRouter.get('/usuario/:id/tasks', authenticateToken, httpGetTasksByProject);
tasksRouter.delete('/tasks/:id', authenticateToken, httpDeleteTask);
tasksRouter.put('/tasks/:id', authenticateToken, httpUpdateTask);

module.exports = tasksRouter;