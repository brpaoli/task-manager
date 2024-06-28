const API_URL = 'http://localhost:5000';
async function httpGetProjects() {
    const response = await fetch(`${API_URL}/projects`)
    return await response.json();
}

export {
  httpGetProjects,
};