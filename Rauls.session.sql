-- 0. Crie o seu próprio banco de dados (Execute apenas uma vez)
CREATE DATABASE IF NOT EXISTS meu_projeto;

-- Mude para o seu banco de dados, e NÃO para o banco de dados 'mysql'
USE meu_projeto;

-- 1. Cria a tabela 'usuarios'
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Chave primária que aumenta automaticamente
    nome VARCHAR(100) NOT NULL,        -- Nome do usuário, obrigatório
    email VARCHAR(100) UNIQUE NOT NULL -- Email único e obrigatório
);

-- 2. Insere alguns dados de teste
INSERT INTO usuarios (nome, email) VALUES 
('João Silva', 'joao.silva@exemplo.com'),
('Maria Souza', 'maria.souza@exemplo.com');

-- 3. Verifica se os dados foram inseridos
SELECT * FROM usuarios;