# Dockerfile para a aplicação Node.js/Express
FROM node:latest

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Instalar nodemon globalmente
RUN npm install -g nodemon

# Copiar o restante do código
COPY . .

# Expor a porta
EXPOSE 5000

# Comando para iniciar a aplicação com nodemon
CMD ["nodemon", "--legacy-watch", "src/server.js"]