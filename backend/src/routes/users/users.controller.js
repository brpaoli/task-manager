const { getAllUsers } = require('../../models/users.model');

async function httpGetAllUsers(req, res) {
    try {
        
        return res.status(200).json(await getAllUsers());
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter os usuários', error });
    }
}

module.exports = {
    httpGetAllUsers,
}