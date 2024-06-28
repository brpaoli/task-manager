const projects = require('../../models/projects.model')
function getAllProjects(req, res) {
    return res.status(200).json(projects);
}

module.exports = {
    getAllProjects,
}