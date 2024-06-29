const { getAllTasks, createTask, getTasksByProject, deleteTask, updateTask  } = require('../models/tasks.model');


async function httpGetAllTasks(req, res) {
    try {
        return res.status(200).json(await getAllTasks());
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter tarefas', error });
    }
}

async function httpSaveNewTask(req, res) {
    const taskData = req.body;

    try {
        const newTask = await createTask(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function httpDeleteTask(req, res) {
    try {
        const taskId = req.params.id;
        const deletedTask = await deleteTask(taskId);
        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar tarefa', error });
    }
}

async function httpGetTasksByProject(req, res) {
    try {
        const projectId = req.params.projectId;
        const tasks = await getTasksByProject(projectId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter tarefas', error });
    }
}

async function httpUpdateTask(req, res) {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        const updatedTask = await updateTask(taskId, taskData);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar tarefa', error });
    }
}

module.exports = {
    httpGetAllTasks,
    httpGetTasksByProject,
    httpSaveNewTask,
    httpDeleteTask,
    httpUpdateTask
}