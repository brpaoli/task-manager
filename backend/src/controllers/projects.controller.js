const { getAllProjects, createProject, updateProject, deleteProject, getProjectsByUser } = require('../models/projects.model');


async function httpGetAllProjects(req, res) {
    try {
        
        return res.status(200).json(await getAllProjects());
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter projetos', error });
    }
}

async function httpCreateProject(req, res) {
    const projectData = req.body;

    try {
        const newProject = await createProject(projectData);
        return res.status(201).json(newProject);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

async function httpUpdateProject(req, res) {
    try {
        const projectId = req.params.id;
        const projectData = req.body;
        const updatedProject = await updateProject(projectId, projectData);
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o projeto', error });
    }
}

async function httpDeleteProject(req, res) {
    try {
        const projectId = req.params.id;
        const deletedProject = await deleteProject(projectId);
        res.status(200).json(deletedProject);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar tarefa', error });
    }
}

async function httpGetProjectsByUser(req, res) {
    try {
        const userId = req.params.id;
        const projects = await getProjectsByUser(userId);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter os projetos', error });
    }
}

module.exports = {
    httpGetAllProjects,
    httpCreateProject,
    httpUpdateProject,
    httpDeleteProject,
    httpGetProjectsByUser
}