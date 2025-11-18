# Projeto de Web
Este projeto é um **Sistema Web CRUD completo** (Alunos, Cursos, Usuários) desenvolvido em **Node.js/Express.js** com arquitetura **MVC** e banco de dados **relacional** interligado e ele implementa **autenticação segura** (sessão e bcrypt) e utiliza **EJS/Bootstrap** para um frontend totalmente **responsivo** e intuitivo.

---
## Integrantes do Grupo

- Lucas Costa Pires
- Guilherme Gouvêa
- Luis Guilherme dos Reis Nascimento
- Nicolas Moreira Menecucci Insfran
---
### Instruções de Instalação e Execução
Siga os passos abaixo para dar certo

#### Pré-Requisitos Básicos
- Node.js
- NPM
- MySQL

### 1°PASSO:
##### Clonar o repositório
- Substitua pelo endereço do seu projeto no GitHub
git clone https://docs.github.com/pt/repositories/creating-and-managing-repositories/quickstart-for-repositories
cd nome do projeto que você fez.

### 2°PASSO:
##### Instalar dependências
- Instale todas as bibliotecas necessárias listadas no package.json:
npm install

### 3°PASSO:
##### Configurar o banco de dados
*1*. Crie um banco de dados vazio no seu SGBD (ex: sistema_academico).

*2*. Crie as tabelas: users, cursos e alunos.

*3*. Assegure que a tabela alunos possui uma Chave Estrangeira (id_curso) que referencia a tabela cursos.

*4*. Configure as variáveis de conexão no arquivo apropriado (ex: /config/database.js ou via arquivo .env).
