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
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
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
    curso_id INT NULL,
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
INSERT INTO alunos (nome, idade, matricula, curso_id) VALUES
('Carlos Pereira', 25, 'MAT2025001', 1),
('Ana Rodrigues', 26,  'MAT2025002', 2),
('Beatriz Lima', 24,   'MAT2025003', 1),
('Diego Santos', 27,   'MAT2025004', 3);

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

