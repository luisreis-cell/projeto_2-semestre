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
*1*. Crie um banco de dados ou use o script SQL provido (`Rauls.session.sql`).

*2*. Configure as variáveis de conexão criando um arquivo `.env` baseado em `.env.example` e ajustando `DB_HOST`, `DB_USER`, `DB_PASSWORD` e `DB_NAME`.

*3*. Rode o seed para criar tabelas e inserir dados de exemplo (gera hashes bcrypt automaticamente):

```powershell
npm install
npm run seed
```

Isso executará o script `Rauls.session.sql` e populará o banco com cursos, alunos e usuários de exemplo.

### 4°PASSO:
##### Executar a aplicação
- Inicie o servidor Express. A porta padrão é tipicamente a 3000.

_Iniciar a aplicação:_

```powershell
npm start
```

Observações:
- Antes de iniciar, crie `.env` e rode `npm run seed` para popular o banco.
- Se quiser usar `nodemon`, adicione-o como devDependency e um script `dev` no `package.json`.
