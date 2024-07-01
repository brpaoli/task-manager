# Dockerfile para a aplicação React
FROM node:latest

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# # Compilar a aplicação
# RUN npm run build

# Instalar nodemon globalmente
RUN npm install -g nodemon

# # Copiar o restante do código
COPY . .

# Expor a porta
EXPOSE 3000

# Comando para iniciar a aplicação no modo de desenvolvimento
CMD ["npm", "start"]
