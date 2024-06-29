require('dotenv').config();
const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/mern-db';
const mongoose = require('mongoose');


const server = http.createServer(app);

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Database is connected');

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} again`);
    });
}).catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});

  
