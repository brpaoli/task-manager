const Projeto = require('./projects.mongo');


async function getAllProjects() {
    return await Projeto.find({}, {
        'id': 0,  '__v': 0,
    });
}

async function createProject(projectData) {
    const { userId, name, description, createdAt } = projectData;

    const novoProjeto = new Projeto({
        userId,
        name,
        description,
        createdAt: createdAt || new Date()
    });

    try {
        await novoProjeto.save();
        return novoProjeto;
    } catch (error) {
        throw new Error(`Erro ao criar projeto: ${error.message}`);
    }
}

async function updateProject(projectId, projectData) {
    try {
        const updatedProject = await Projeto.findByIdAndUpdate(projectId, projectData, { new: true });
        if (!updatedProject) {
            throw new Error('Projeto não encontrado');
        }
        return updatedProject;
    } catch (error) {
        throw new Error(`Erro ao atualizar o projeto: ${error.message}`);
    }
}

async function deleteProject(projectId) {
    try {
        const result = await Projeto.findByIdAndDelete(projectId);
        if (!result) {
            throw new Error('Projeto não encontrado');
        }
        return result;
    } catch (error) {
        throw new Error(`Erro ao deletar o projeto: ${error.message}`);
    }
}

async function getProjectsByUser(userId) {
    try {
        // Encontrar todos os projetos do usuário
        const projetos = await Projeto.find({ userId }, {
            'id': 0,  '__v': 0,
        });


        if (projetos.length === 0) {
            throw new Error('Nenhum projeto encontrado para este usuário');
            
        }
        return projetos;
    } catch (error) {
        throw new Error(`Erro ao obter os projetos: ${error.message}`);
    }
}

module.exports = {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
    getProjectsByUser

}