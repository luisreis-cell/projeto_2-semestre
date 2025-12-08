# Projeto Final 2º Semestre - Sistema Acadêmico

Este projeto é um **Sistema Web CRUD completo** desenvolvido em **Node.js/Express.js** com arquitetura **MVC** e banco de dados **relacional** interligado. O sistema implementa **autenticação segura** (sessão e bcrypt) e utiliza **EJS/Bootstrap** para um frontend totalmente **responsivo** e intuitivo.

## 📋 Descrição do Projeto

Sistema de gestão acadêmica que permite o gerenciamento completo de **Alunos**, **Cursos** e **Usuários**, com controle de acesso baseado em papéis (admin, professor, aluno). O sistema implementa todas as operações CRUD (Create, Read, Update, Delete) com relacionamentos entre tabelas e consultas complexas utilizando JOIN.

## 👥 Integrantes do Grupo

- Lucas Costa Pires
- Guilherme Gouvêa
- Luis Guilherme dos Reis Nascimento
- Nicolas Moreira Menecucci Insfran

## 🚀 Funcionalidades Implementadas

### Cadastro (CRUD - Create)
- ✅ Cadastro de usuários (com login e senha criptografada)
- ✅ Cadastro de alunos
- ✅ Cadastro de cursos

### Edição (CRUD - Update)
- ✅ Editar dados de um aluno
- ✅ Alterar o curso associado a um aluno (chave estrangeira)
- ✅ Atualizar dados de usuário (nome, email, papel)

### Consulta (CRUD - Read)
- ✅ Listar todos os alunos com o nome do curso associado (JOIN)
- ✅ Exibir dados de um usuário logado (painel e perfil)
- ✅ Consultar cursos com contagem de alunos associados (JOIN)

### Exclusão (CRUD - Delete)
- ✅ Excluir aluno
- ✅ Excluir curso (com verificação de alunos associados)
- ✅ Excluir usuário

### Autenticação e Segurança
- ✅ Autenticação de usuário com sessão (session-based auth)
- ✅ Criptografia de senhas com bcrypt antes de armazenar no banco de dados
- ✅ Controle de acesso baseado em papéis (admin, professor, aluno)

### Arquitetura e Organização
- ✅ Padrão de arquitetura MVC (Model-View-Controller)
- ✅ Roteamento estruturado seguindo o padrão RESTful
- ✅ Frontend com EJS para renderização de páginas dinâmicas
- ✅ Partials com EJS para componentes reutilizáveis (header, footer)
- ✅ Layout responsivo baseado em Bootstrap (grid de 12 colunas)

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js com Express.js
- **Frontend**: HTML, CSS, JavaScript, EJS
- **Banco de Dados**: MySQL (relacional)
- **Autenticação**: express-session, bcrypt
- **Controle de Versão**: Git + GitHub

## 📦 Instalação e Execução

### Pré-Requisitos

- Node.js (versão 14 ou superior)
- NPM (geralmente vem com Node.js)
- MySQL (versão 5.7 ou superior)

### Passo 1: Clonar o repositório

```bash
git clone https://github.com/luisreis-cell/projeto_2-semestre.git
cd projeto_2-semestre
```

### Passo 2: Instalar dependências

```bash
npm install
```

### Passo 3: Configurar o banco de dados

1. Crie um banco de dados MySQL ou use o script SQL fornecido (`Rauls.session.sql`).

2. Configure as variáveis de conexão criando um arquivo `.env` na raiz do projeto:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=odair0106
DB_NAME=projeto2
```

3. Execute o script SQL para criar as tabelas:

```bash
mysql -u root -p < Rauls.session.sql
```

Ou importe o arquivo `Rauls.session.sql` através de uma ferramenta gráfica como MySQL Workbench ou phpMyAdmin.

4. (Opcional) Execute o seed para popular o banco com dados de exemplo:

```bash
npm run seed
```

### Passo 4: Executar a aplicação

```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

### Modo Desenvolvimento (com nodemon)

Se você tiver o nodemon instalado globalmente ou como devDependency:

```bash
npm run dev
```

## 📁 Estrutura do Projeto

```
projeto_2-semestre/
├── src/
│   ├── config/          # Configurações (banco de dados, sessão)
│   ├── controllers/     # Lógica de negócio (MVC)
│   ├── models/          # Modelos de dados (MVC)
│   ├── routes/          # Definição de rotas
│   ├── views/           # Templates EJS (MVC)
│   │   ├── aluno/       # Views relacionadas a alunos
│   │   ├── curso/       # Views relacionadas a cursos
│   │   ├── usuario/     # Views relacionadas a usuários
│   │   ├── painel/      # Views dos painéis por papel
│   │   └── partials/    # Componentes reutilizáveis (header, footer)
│   └── middleware/      # Middlewares (autenticação)
├── scripts/             # Scripts auxiliares (seed)
├── server.js            # Arquivo principal da aplicação
├── package.json         # Dependências e scripts
├── Rauls.session.sql    # Script SQL do banco de dados
└── README.md            # Este arquivo
```

## 🔐 Credenciais de Exemplo

Após executar o seed, você pode usar as seguintes credenciais (ou criar novas através do cadastro):

- **Admin**: email: `admin@example.com`, senha: `admin123`
- **Professor**: email: `professor@example.com`, senha: `prof123`
- **Aluno**: email: `aluno@example.com`, senha: `aluno123`

## 📝 Observações Importantes

- Antes de iniciar a aplicação, certifique-se de ter criado o arquivo `.env` com as configurações do banco de dados.
- O banco de dados deve estar rodando antes de iniciar a aplicação.
- As senhas são criptografadas usando bcrypt antes de serem armazenadas no banco de dados.
- O sistema utiliza sessões para manter o usuário autenticado.

## 🔗 Link do Repositório

**GitHub**: https://github.com/luisreis-cell/projeto_2-semestre

## 🤝 Contribuindo

Este é um projeto acadêmico. Para contribuições, entre em contato com os integrantes do grupo.

## 📄 Licença

Este projeto é de uso acadêmico.

