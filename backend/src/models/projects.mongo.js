const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define o schema de Projetos
const projetoSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
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
const Projeto = mongoose.model('Projeto', projetoSchema);

module.exports = Projeto;