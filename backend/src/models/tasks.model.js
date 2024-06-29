const Tarefa = require('./tasks.mongo');
const Projeto = require('./projects.mongo');
const Usuario = require('./users.mongo');

async function getAllTasks() {
    return await Tarefa.find();
}


async function createTask(taskData) {
    const { projectId, title, description, status, completedBy, completedAt } = taskData;

        try {
        // Verifique se o projeto existe
        const projeto = await Projeto.findById(projectId);
        if (!projeto) {
            throw new Error('Projeto não encontrado');
        }

        // Verifique se o usuário que completou a tarefa existe, se fornecido
        if (completedBy) {
            const usuario = await Usuario.findById(completedBy);
            if (!usuario) {
                throw new Error('Usuário que completou a tarefa não encontrado');
            }
        }

        // Crie uma nova tarefa
        const novaTarefa = new Tarefa({
            projectId,
            title,
            description,
            status,
            completedBy,
            completedAt
        });

        // Salve a nova tarefa
        await novaTarefa.save();
        return novaTarefa;
    } catch (error) {
        throw new Error(`Erro ao criar tarefa: ${error.message}`);
    }
}

async function getTasksByProject(projectId) {
    try {
        // Encontrar todos os projetos do usuário
        const projetos = await Projeto.find({ projectId });

        if (projetos.length === 0) {
            throw new Error('Nenhum projeto encontrado para este usuário');
            
        }

        // Extrair os IDs dos projetos
        const projetoIds = projetos.map(projeto => projeto._id);

        // Encontrar todas as tarefas associadas aos projetos do usuário
        const tarefas = await Tarefa.find({ projectId: { $in: projetoIds } });

        return tarefas;
    } catch (error) {
        throw new Error(`Erro ao obter tarefas: ${error.message}`);
    }
}


async function updateTask(taskId, taskData) {
    try {
        const updatedTask = await Tarefa.findByIdAndUpdate(taskId, taskData, { new: true });
        if (!updatedTask) {
            throw new Error('Tarefa não encontrada');
        }
        return updatedTask;
    } catch (error) {
        throw new Error(`Erro ao atualizar tarefa: ${error.message}`);
    }
}

async function deleteTask(taskId) {
    try {
        const result = await Tarefa.findByIdAndDelete(taskId);
        if (!result) {
            throw new Error('Tarefa não encontrada');
        }
        return result;
    } catch (error) {
        throw new Error(`Erro ao deletar tarefa: ${error.message}`);
    }
}

module.exports = {
    getAllTasks,
    getTasksByProject,
    createTask,
    deleteTask,
    updateTask
}