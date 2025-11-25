/*
    Rauls.session.sql
    Esquema do banco relacional para o projeto (MySQL)

    Contém tabelas:
        - usuarios  (autenticação)
        - cursos    (catálogo de cursos)
        - alunos    (alunos vinculados a cursos)

    Observações:
        - As senhas devem ser armazenadas como hashes bcrypt gerados pela aplicação.
        - Use InnoDB para suportar chaves estrangeiras.
        - Execute este arquivo com: `mysql -u root -p < Rauls.session.sql` (PowerShell)
*/

-- 0. Criar banco de dados
CREATE DATABASE IF NOT EXISTS projeto2
    DEFAULT CHARACTER SET = utf8mb4
    DEFAULT COLLATE = utf8mb4_unicode_ci;
USE projeto2;

-- Garantir que tabelas antigas sejam removidas na ordem correta
DROP TABLE IF EXISTS alunos;
DROP TABLE IF EXISTS cursos;
DROP TABLE IF EXISTS usuarios;

-- 1) Tabela de usuários (autenticação)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL, -- armazenar hash bcrypt aqui (ex: $2b$...)
    papel ENUM('admin','user') NOT NULL DEFAULT 'user',
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2) Tabela de cursos
CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT NULL,
    duracao_meses INT UNSIGNED DEFAULT 0,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3) Tabela de alunos (relaciona-se com cursos via foreign key)
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    idade INT NULL,
    matricula VARCHAR(60) NOT NULL UNIQUE,
    email VARCHAR(150) NULL,
    curso_id INT NULL,
    data_nascimento DATE NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_aluno_curso FOREIGN KEY (curso_id) REFERENCES cursos(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Índices úteis
CREATE INDEX idx_aluno_curso ON alunos(curso_id);

-- Seeds de exemplo
-- Cursos
INSERT INTO cursos (nome, descricao, duracao_meses) VALUES
('Desenvolvimento Web', 'Formação em front-end e back-end com Node.js e Express.', 6),
('Engenharia de Software', 'Conceitos e práticas de engenharia de software.', 12),
('Banco de Dados', 'Modelagem, SQL e administração de bancos relacionais.', 4);

-- Alunos (vinculados a cursos)
INSERT INTO alunos (nome, idade, matricula, email, curso_id, data_nascimento) VALUES
('Carlos Pereira', 25, 'MAT2025001', 'carlos.pereira@exemplo.com', 1, '2000-05-12'),
('Ana Rodrigues', 26,  'MAT2025002', 'ana.rodrigues@exemplo.com', 2, '1999-11-30'),
('Beatriz Lima', 24,   'MAT2025003', NULL, 1, '2001-02-20'),
('Diego Santos', 27,   'MAT2025004', 'diego.santos@exemplo.com', 3, '1998-08-08');

-- Usuários (autenticação)
-- ATENÇÃO: gere hashes bcrypt a partir da sua aplicação/console Node.js antes de inserir.
-- Exemplo (Node.js):
--   const bcrypt = require('bcrypt');
--   const hash = await bcrypt.hash('senha123', 10);
--   console.log(hash);
-- Copie o hash resultante e use no campo `senha` abaixo.

-- Inserções de exemplo com placeholders (substitua os hashes):
INSERT INTO usuarios (nome, email, senha, papel) VALUES
('Administrador', 'admin@exemplo.com', '<bcrypt_hash_here>', 'admin'),
('Professor', 'prof@exemplo.com', '<bcrypt_hash_here>', 'user'),
('Aluno Teste', 'aluno@exemplo.com', '<bcrypt_hash_here>', 'user');

-- Consultas úteis (exemplos para a aplicação)
-- 1) Listar todos os alunos com nome do curso (JOIN)
SELECT a.id, a.nome AS aluno, a.matricula, a.email, c.nome AS curso
FROM alunos a
LEFT JOIN cursos c ON a.curso_id = c.id
ORDER BY a.nome;

-- 2) Mostrar dados do usuário (por id ou email)
SELECT id, nome, email, papel, criado_em FROM usuarios WHERE email = 'aluno@exemplo.com';

-- 3) Contar alunos por curso (aggregate + join)
SELECT c.id, c.nome AS curso, COUNT(a.id) AS total_alunos
FROM cursos c
LEFT JOIN alunos a ON a.curso_id = c.id
GROUP BY c.id, c.nome;

-- Exemplo de exclusão segura de um curso:
-- Verificar se existem alunos vinculados antes de apagar
-- START TRANSACTION;
-- SELECT COUNT(*) INTO @qtd FROM alunos WHERE curso_id = 2;
-- -- Se @qtd = 0 então pode apagar, caso contrário tratar na aplicação
-- DELETE FROM cursos WHERE id = 2 AND NOT EXISTS (SELECT 1 FROM alunos WHERE curso_id = 2);
-- COMMIT;

/*
    Como gerar hashes bcrypt rapidamente (Node.js REPL)
    1) No terminal: `node`  (ou crie um pequeno script)
    2) No REPL:
         const bcrypt = require('bcrypt');
         bcrypt.hash('sua_senha_aqui', 10).then(h=>console.log(h));
    3) Copie o hash e cole no INSERT acima no lugar de '<bcrypt_hash_here>'.

    Importar este arquivo:
    - Pelo terminal (PowerShell):
        mysql -u <usuario> -p < Rauls.session.sql

    Observação de segurança:
    - Nunca armazene senhas em claro.
    - Faça validação e hashing na camada de aplicação (Node.js) antes de persistir.
*/