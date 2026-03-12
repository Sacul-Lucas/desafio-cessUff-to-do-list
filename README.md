🌟 Desafio Fullstack – Plataforma de Tarefas (To-Do List)
📌 Descrição Geral

Esta aplicação é uma Plataforma de Tarefas (To-Do List) desenvolvida para gerenciamento pessoal de atividades.
O projeto cobre todo o fluxo fullstack, do banco de dados ao frontend, com autenticação de usuários, CRUD de tarefas, e segurança básica aplicada.

💡 Objetivo

Permitir que usuários se cadastrem e autentiquem.

Gerenciar tarefas pessoais (criar, listar, atualizar, deletar).

Garantir que cada usuário acesse apenas suas próprias tarefas.

Aplicar boas práticas de desenvolvimento, segurança e UX.

🛠 Tecnologias Utilizadas

Frontend: ReactJS + TypeScript + shadcnUI

Backend: NodeJS + Express + TypeScript

Banco de Dados: MongoDB

Autenticação: JWT

Contêineres: Docker & Docker Compose

Outras: Axios, bcrypt, Zod (validação), Cors

📂 Estrutura de Pastas e Arquivos
/todo-app
│
├── backend
│   ├── src
│   │   ├── controllers   # Lógica de rotas
│   │   ├── models        # Modelos Mongoose (User, Task)
│   │   ├── routes        # Definição de endpoints
│   │   ├── middlewares   # Autenticação e validações
│   │   └── utils         # Funções auxiliares (hash, token, etc)
│   ├── package.json
│   └── tsconfig.json
│
├── frontend
│   ├── src
│   │   ├── components    # Botões, formulários, layouts
│   │   ├── pages         # Login, Cadastro, Dashboard
│   │   ├── services      # Chamadas API via Axios
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
└── README.md
🗄 Modelagem do Banco de Dados
Usuário
Campo	Tipo	Observações
_id	ObjectId	Chave primária
nome	String	Obrigatório
email	String	Único, obrigatório
senha	String	Hash seguro
Tarefa
Campo	Tipo	Observações
_id	ObjectId	Chave primária
titulo	String	Obrigatório
descricao	String	Opcional
status	String	pendente / concluida
usuarioId	ObjectId	Referência ao usuário

Relacionamento:

Um usuário → várias tarefas (1:N).

⚙️ Funções Principais do Backend

Cadastro de usuário: valida email único, hash de senha, retorna JWT.

Login: valida credenciais, retorna JWT.

CRUD de tarefas: criar, listar, atualizar, deletar tarefas associadas ao usuário autenticado.

Segurança:

JWT para rotas protegidas.

Hash de senha com bcrypt.

Validação de inputs com Zod.

Tratamento de erros consistente (mensagens claras).

🖥 Frontend

Login e Cadastro: formulários com validação.

Dashboard: lista de tarefas do usuário, atualização dinâmica via React state.

Tarefas: adicionar, marcar como concluída, deletar.

Extras implementados: filtro de tarefas (todas, pendentes, concluídas) e design responsivo com shadcnUI.

🔐 Segurança Aplicada

Hash de Senha: bcrypt para armazenamento seguro.

Rotas Privadas: JWT verifica usuário antes de qualquer operação de CRUD.

Validação de Input: Frontend e backend validam dados obrigatórios e formatos.

Proteção XSS/SQL Injection: uso de React e MongoDB evita execução de scripts maliciosos.

🚀 Fluxo de Uso do Sistema

Usuário acessa a tela de cadastro ou login.

Após autenticação, é redirecionado para o dashboard.

Usuário pode:

Adicionar nova tarefa

Marcar tarefas como concluídas

Deletar tarefas

Filtrar tarefas (pendentes/concluídas)

Todas as alterações são salvas no MongoDB e refletidas em tempo real no frontend.

🐳 Guia de Instalação e Execução com Docker

Clone o repositório:

git clone https://github.com/SEU_USUARIO/todo-app.git
cd todo-app

Execute o Docker Compose:

docker-compose up --build

Acesse as aplicações:

Frontend: http://localhost:2000

Backend: http://localhost:2500

📄 Documentação de Rotas (Backend)
Usuários
Método	Rota	Descrição
POST	/api/users	Cadastro
POST	/api/login	Autenticação (JWT)
Tarefas (rotas privadas)
Método	Rota	Descrição
GET	/api/tasks	Listar tarefas do usuário
POST	/api/tasks	Criar nova tarefa
PUT	/api/tasks/:id	Atualizar tarefa
DELETE	/api/tasks/:id	Deletar tarefa