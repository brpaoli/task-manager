# Projeto Gerenciador de tarefas - MERN com Autenticação JWT

## Visão Geral

Este projeto é uma aplicação MERN (MongoDB, Express, React, Node.js) que inclui autenticação JWT (JSON Web Token). Ele permite a criação, leitura, atualização e exclusão de projetos e tarefas, permite a criação de usuários e login na aplicação além de proteger rotas usando tokens JWT.

## Estrutura do Projeto

O projeto é dividido em duas partes principais: **frontend** e **backend**.
Ambas as partes são gerenciadas e iniciadas usando o Docker e um arquivo `docker-compose.yaml`.

```
/backend
   └──subdiretórios
/frontend
   └──subdiretórios
.env
.dockerignore
.gitignore
package.json
README.md
docker-compose.yaml

```

### Endpoints

Os endpoints foram criados seguinte as instruções da tarefa, ficaram assim.

#### Autenticação

<b>Registrar Usuário</b>

- URL: /auth/register
- Método: POST
- Descrição: Registra um novo usuário.
- Exemplo de Corpo da Requisição:

```
{
  "name": "Nome do Usuário",
  "email": "email@example.com",
  "password": "senhaSegura"
}
```

<b>Autenticar Usuários </b>

- URL: /auth/login
- Método: POST
- Descrição: Autentica um usuário e retorna um token JWT.
- Corpo da Requisição:

```
{
  "email": "email@example.com",
  "password": "senhaSegura"
}
```

#### Projetos

<b>Listar Todos os Projetos do Usuário</b>
-URL: /projects
-Método: GET
-Descrição: Retorna todos os projetos. (Requer Autenticação)
-Cabeçalhos:
Authorization: Bearer <token_jwt>

<b>Editar Projeto</b>
-URL: /projects:id
-Método: PUT
-Descrição: Retorna todos os projetos. (Requer Autenticação)
-Cabeçalhos:
Authorization: Bearer <token_jwt>

<b>Criar Projeto</b>
-URL: /projects
-Método: POST
-Descrição: Retorna todos os projetos. (Requer Autenticação)
-Cabeçalhos:
Authorization: Bearer <token_jwt>

<b>Remover Projeto</b>
-URL: /projects:id
-Método: DELETE
-Descrição: Retorna todos os projetos. (Requer Autenticação)
-Cabeçalhos:
Authorization: Bearer <token_jwt>

#### Tarefas

<b>Listar Todas as Tarefas</b>
URL: /tasks
Método: GET
Descrição: Retorna todas as tarefas. (Requer Autenticação)
Cabeçalhos:
Authorization: Bearer <token_jwt>

<b>Criar Nova Tarefa</b>
URL: /tasks
Método: POST
Descrição: Cria uma nova tarefa. (Requer Autenticação)
Corpo da Requisição:

```
{
  "projectId": "ID do Projeto",
  "title": "Título da Tarefa",
  "description": "Descrição da Tarefa",
  "status": "pendente" // ou "concluída"
}
```

Cabeçalhos:
Authorization: Bearer <token_jwt>

<b>Obter Tarefas por Projeto</b>
URL: /users/:id/tasks
Método: GET
Descrição: Retorna todas as tarefas de um usuário específico. (Requer Autenticação)
Cabeçalhos:
Authorization: Bearer <token_jwt>

## Estrutura do código do Backend

A estrutura segue o padrão <b>MVC (Model-View-Controller)</b>. O padrão MVC é uma arquitetura de software que separa a aplicação em três componentes principais: Model (Modelo), View (Visão) e Controller (Controlador).

#### Modelos (/models)

Os modelos são responsáveis por gerenciar a lógica de dados da aplicação. Eles definem a estrutura dos dados e interagem com o banco de dados. Na estrutura do projeto , os modelos estão localizados na pasta /models

- users.model.js e users.mongo.js
- projects.model.js e projects.mongo.js
- tasks.model.js e tasks.mongo.js

Esses arquivos contêm a definição dos schemas Mongoose e as funções de manipulação da camada de acesso de dados (CRUD).

#### Controladores

Os controladores são responsáveis por receber as requisições dos clientes, processá-las (possivelmente interagindo com os modelos) e retornar a resposta adequada. Na estrutura do projeto, os controladores estão localizados na pasta `/controllers`.

- auth.controller.js
- projects.controller.js
- tasks.controller.js

Esses arquivos contêm as funções que lidam com as requisições HTTP e chamam os métodos apropriados dos modelos.

#### Middleware

Os middlewares são funções que podem manipular as requisições e respostas antes que elas cheguem aos controladores. Na nossa estrutura, temos middlewares de autenticação, localizados em /middleware:

- auth.middleware.js

#### Rotas

As rotas são responsáveis por definir os endpoints da API e mapear as requisições HTTP para os controladores apropriados. Na nossa estrutura, as rotas estão localizadas na pasta `/routes`.

- auth.routes.js
- projects.routes.js
- tasks.routes.js

#### server.js

Este arquivo é o ponto de entrada principal da aplicação. Ele configura o servidor HTTP, conecta-se ao MongoDB e inicia o servidor.

#### app.js

Este arquivo configura o aplicativo Express, define os middlewares e as rotas principais.

#### Estrutura de diretórios do Backend

```
/backend
  ├── models
  │   ├── tasks.model.js
  │   ├── tasks.mongo.js
  │   ├── projects.model.js
  │   ├── projects.mongo.js
  │   ├── users.model.js
  │   └── users.mongo.js
  ├── routes
  │   ├── tasks.routes.js
  │   ├── projects.routes.js
  │   └── auth.routes.js
  ├── controllers
  │   ├── tasks.controller.js
  │   ├── projects.controller.js
  │   └── users.controller.js
  ├── middleware
  │   └── auth.middleware.js
  ├── .env
  ├── server.js
  └── app.js
```

## Frontend

#### Visão Geral

Esta é uma aplicação React que utiliza Tailwind CSS para estilização, autenticação JWT para verificação de login de usuário, react-router-dom v6 para navegação entre páginas, e Redux para gerenciamento de estado global e que consome as APIs geradas no backend utilizando o pacote Axios.

#### Estrutura do Projeto

```
project-root/
│
├── src/
│   ├── components/
│   │   ├── ProjectCard.js
│   │   ├── ProjectForm.js
│   │   ├── ProjectList.js
│   │   ├── TaskList.js
│   │   └── ...
│   │
│   ├── hooks/
│   │   ├── useProjects.js
│   │   ├── useTasks.js
│   │   └── ...
│   │
│   ├── redux/
│   │   ├── authSlice.js
│   │   ├── store.js
│   │   └── ...
│   │
│   ├── utils/
│   │   └── routes.js
│   │
│   |
│   ├── index.js
│   └── ...
│
├── public/
│   ├── index.html
│   └── ...
│
├── .env
├── package.json
└── ...
```

#### Configuração de Autenticação

A autenticação é feita através de tokens JWT. Após o login, o token é salvo no estado global utilizando Redux.
Primeiro armazenamos o valor recebido da consulta via API do token em localStorage e posteriormente passamos ele através da aplicação utlizando reduz.

#### Navegação

A aplicação usa react-router-dom v6 para navegação entre as páginas. A estrutura das rotas é definida em utils/routes.js que é importado para o index.js e utilizado na criação das rotas.
Se o usuário estiver logado ele é redirecionado para a página de projetos, se não ele é enviado para a página de Login.

#### Gerenciamento de Estado

Utilizei Redux para gerenciar o estado global da aplicação. A configuração do store é feita em redux/store.js e authSlice.js , durante o desenvolvimento do projeto também fiz bastante uso do useState do próprio React para gerenciar o estado ou props de alguns componente.

#### Estilização

A estilização é feita utilizando Tailwind CSS. A configuração básica pode ser encontrada no arquivo tailwind.config.js. No demais a estilização é bem simples, foram acrescentadas algumas classes para estilizar um pouco a aparência do frontend.

## Docker-compose

Este arquivo docker-compose.yml define a configuração para uma aplicação MERN (MongoDB, Express, React, Node.js) composta por três serviços principais: MongoDB, backend (Node.js/Express) e frontend (React). Abaixo, detalhamos cada serviço e suas configurações.

#### 1. mongo

Imagem: Utiliza a imagem oficial mais recente do MongoDB.
Nome do Contêiner: O contêiner é nomeado como mongo.
Portas: Mapeia a porta 27017 do contêiner para a porta 27017 do host, permitindo acesso ao banco de dados MongoDB.
Volumes: Utiliza um volume nomeado mongo-data para persistir os dados do MongoDB, mesmo que o contêiner seja removido ou parado.

```
mongo:
  image: mongo:latest
  container_name: mongo
  ports:
    - "27017:27017"
  volumes:
    - mongo-data:/data/db
```

#### 2. backend

Build:
Contexto: A configuração do build está na pasta ./backend.
Dockerfile: Especifica o uso do Dockerfile na pasta ./backend.
Nome do Contêiner: O contêiner é nomeado como backend.
Portas: Mapeia a porta 5000 do contêiner para a porta 5000 do host, permitindo acesso ao servidor Node.js/Express.
Dependências: O serviço backend depende do serviço mongo, garantindo que o MongoDB esteja em execução antes do backend.
Ambiente: Define a variável de ambiente MONGO_URI para conectar ao MongoDB.
Volumes: Monta a pasta ./backend do host para /app no contêiner, e a pasta node_modules dentro do contêiner para persistir as dependências instaladas.

```
backend:
  build:
    context: ./backend
    dockerfile: Dockerfile
  container_name: backend
  ports:
    - "5000:5000"
  depends_on:
    - mongo
  environment:
    MONGO_URI: mongodb://mongo:27017/mern-db
  volumes:
    - ./backend:/app
    - /app/node_modules
```

#### 3. frontend

Build:
Contexto: A configuração do build está na pasta ./frontend.
Dockerfile: Especifica o uso do Dockerfile na pasta ./frontend.
Nome do Contêiner: O contêiner é nomeado como frontend.
Portas: Mapeia a porta 3000 do contêiner para a porta 3000 do host, permitindo acesso à aplicação React.
Dependências: O serviço frontend depende do serviço backend, garantindo que o backend esteja em execução antes do frontend.
Volumes: Monta a pasta ./frontend do host para /app no contêiner, e a pasta node_modules dentro do contêiner para persistir as dependências instaladas.
Ambiente: Define a variável de ambiente WATCHPACK_POLLING=true para ativar a detecção de mudanças no código.

```
frontend:
  build:
    context: ./frontend
    dockerfile: Dockerfile
  container_name: frontend
  ports:
    - "3000:3000"
  depends_on:
    - backend
  volumes:
    - ./frontend:/app
    - /app/node_modules
  environment:
    - WATCHPACK_POLLING=true

```

#### 4

```
volumes:
  mongo-data:

```

mongo-data: Um volume nomeado utilizado pelo serviço mongo para persistir os dados do MongoDB.

### Resumo

Resumo
Este arquivo docker-compose.yml simplifica a orquestração dos serviços necessários para a aplicação MERN. Utiliza três contêineres: um para o banco de dados MongoDB, um para o backend Node.js/Express, e um para o frontend React. Cada serviço está configurado para suas necessidades específicas, como mapeamento de portas, volumes para persistência de dados e dependências, e variáveis de ambiente para configuração de runtime.

## Configuração do Projeto

1. **Criando um Clone o repositório:**

   ```sh
   git clone https://github.com/brpaoli/task-manager.git
   cd <NOME_DO_DIRETORIO>
   ```

2. **Crie um arquivo .env na raiz do projeto com as seguintes variáveis:**

   ```
    PORT=5000
    MONGO_URI=mongodb://mongo:27017/mern-db
    JWT_SECRET=your_jwt_secret_key

   ```

3. **Faça o build da aplicação utilizando o arquivo docker-compose, executando o comando abaixo dentro da pasta raíz do projeto:**

   ```
   docker-compose up --build
   ```

Ao rodar o comando serão montados os 3 containers, do frontend (PORTA:3000), backend(PORTA:5000) e do banco. Seria possível também fazer o build do frontend do react e carrega-lo estaticamente na mesma porta do backend a porta:3000, isso é especialmente útli quando estamos tentando evitar alguns problemas relacionados a CORS, no entando optei por não levar essa idéia adiante, porq ue o processo de build era um pouco lento durante o desenvolvimento.

Qualquer feedback é bem-vindo. Uma coisa que aprendi ao longo dos anos desenvolvendo é que ninguém sabe tudo. Dito isso, agradeço a oportunidade e espero ter sorte no processo. =)
