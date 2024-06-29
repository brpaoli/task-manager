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

<b>Obter Tarefas por Usuário</b>
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

## Configuração

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
