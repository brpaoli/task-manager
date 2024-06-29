const Usuario = require('./users.mongo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

async function getAllUsers() {
    return await Usuario.find({}, {
        'id': 0, '__v': 0, 'password': 0,
    });
}

async function registerUser(userData) {
    const { name, email, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const novoUsuario = new Usuario({
        name,
        email,
        password: hashedPassword,
        createdAt: new Date()
    });

    try {
        await novoUsuario.save();
        return novoUsuario;
    } catch (error) {
        throw new Error(`Erro ao registrar usuário: ${error.message}`);
    }
}

async function authenticateUser(email, password) {
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            throw new Error('Email ou senha inválidos');
        }

        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            throw new Error('Email ou senha inválidos');
        }

        const token = jwt.sign({ id: usuario._id, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });

        return { token, user: { id: usuario._id, name: usuario.name, email: usuario.email } };
    } catch (error) {
        throw new Error(`Erro na autenticação: ${error.message}`);
    }
}

function validateToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Token inválido');
    }
}

module.exports = {
    getAllUsers,
    registerUser,
    authenticateUser,
    validateToken
}