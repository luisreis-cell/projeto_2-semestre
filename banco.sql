CREATE DATABASE IF NOT EXISTS SistemaEscolar;
USE SistemaEscolar;

-- 1. Tabela Usuarios (Centraliza login/acesso)
CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL, -- Senha deve ser HASHED no Node.js!
    tipo ENUM('admin', 'instrutor', 'aluno') NOT NULL DEFAULT 'aluno',
    telefone VARCHAR(15), -- Adicionei telefone aqui, pois Alunos foi simplificado
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela Cursos
CREATE TABLE Cursos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    duracao INT, -- duração em horas
    data_inicio DATE,
    data_fim DATE
);

-- 3. Tabela Alunos (Simplificada, apenas mapeamento ou dados específicos de aluno)
-- Se a única informação específica de aluno for o ID do usuário, esta tabela é opcional.
-- Mantive para fins de rastreio de perfil do aluno.
CREATE TABLE Alunos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT UNIQUE NOT NULL, -- O aluno deve ser um usuário
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
        ON DELETE CASCADE -- Se o usuário for excluído, o registro de aluno também é
);

-- 4. Tabela Cursos_Instrutores (Relacionamento N:N: Quem ensina o quê)
CREATE TABLE Cursos_Instrutores (
    curso_id INT NOT NULL,
    instrutor_id INT NOT NULL, -- O instrutor deve ser um Usuario com tipo='instrutor'
    PRIMARY KEY (curso_id, instrutor_id),
    FOREIGN KEY (curso_id) REFERENCES Cursos(id) ON DELETE CASCADE,
    FOREIGN KEY (instrutor_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);

-- 5. Tabela Matriculas (Aluno se matricular em Curso)
CREATE TABLE Matriculas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    aluno_id INT,               -- Chave estrangeira para a tabela Alunos
    curso_id INT,
    data_matricula TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativa', 'concluida', 'cancelada') DEFAULT 'ativa',
    
    -- Restrições de Chaves Estrangeiras
    FOREIGN KEY (aluno_id) REFERENCES Alunos(id) ON DELETE RESTRICT, 
    FOREIGN KEY (curso_id) REFERENCES Cursos(id) ON DELETE RESTRICT,
    
    -- Garante que um aluno só pode se matricular em um curso UMA VEZ
    UNIQUE KEY uk_matricula (aluno_id, curso_id) 
);

<<<<<<< HEAD
-- Opcional: criar usuário de aplicação e conceder permissões
-- Este bloco estava perfeito para ambiente de desenvolvimento.
=======
>>>>>>> 52eee40caecd3db1aa98b9e7867a6fbf99e7253b
CREATE USER IF NOT EXISTS 'app_user'@'%' IDENTIFIED BY 'S3nh@Aplicacao';
GRANT SELECT, INSERT, UPDATE, DELETE ON SistemaEscolar.* TO 'app_user'@'%';
FLUSH PRIVILEGES;
