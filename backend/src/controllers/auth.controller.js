const { registerUser, authenticateUser  } = require('../models/users.model');

async function httpRegisterUser(req, res) {
    const userData = req.body;

    try {
        const newUser = await registerUser(userData);
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

async function httpLoginUser(req, res) {
    const { email, password } = req.body;

    try {
        const { token, user } = await authenticateUser(email, password);
        return res.status(200).json({ token, user });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    httpRegisterUser,
    httpLoginUser,
}