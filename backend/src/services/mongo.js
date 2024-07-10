require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/mern-db';



async function mongoConnect() {
    await mongoose.connect(mongoUri)
    .then(() => {
      console.log('Database is connected');
  
  }).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect

}