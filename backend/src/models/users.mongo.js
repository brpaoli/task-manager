const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define o schema de Usuarios
const usuarioSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Cria o modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;