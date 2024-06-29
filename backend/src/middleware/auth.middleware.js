const { validateToken } = require('../models/users.model');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Se não houver token, retorna 401 (Não autorizado)

    try {
        const user = validateToken(token);
        req.user = user;
        next(); // Se o token for válido, permite o acesso à rota
    } catch (error) {
        return res.sendStatus(403); // Se o token for inválido, retorna 403 (Proibido)
    }
}

module.exports = authenticateToken;