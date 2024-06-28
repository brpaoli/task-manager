const projects = require('./projects.mongo.js');


function isProjectComplete(project) {
  return project['status'] === 'complete';
}


function loadProjectsData() {
    return new Promise((resolve, reject) => {
        //Pega a coleção do banco de projetos do banco

    });
}

async function getAllProjects() {

}

async function saveProject(project) {

}

module.exports = {
    isProjectComplete,
    loadProjectsData,
    getAllProjects,
    saveProject

}