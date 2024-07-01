const mongoose = require('mongoose');
const { Schema } = mongoose;
// Define o schema
const tarefaSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Projeto',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pendente', 'concluída'],
    default: 'pendente'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

// Cria o modelo
const Tarefa = mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;