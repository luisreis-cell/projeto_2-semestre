CREATE DATABASE SistemaEscolar;
USE SistemaEscolar;

CREATE TABLE Usuarios (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
senha VARCHAR(255) NOT NULL,
tipo ENUM('admin', 'instrutor', 'aluno') DEFAULT 'aluno',
data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Alunos (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
telefone VARCHAR(15),
data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Cursos (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
descricao TEXT,
duracao INT, --duração em horas
data_inicio DATE,
data_fim DATE
);

CREATE TABLE Matriculas (
id INT PRIMARY KEY AUTO_INCREMENT,
aluno_id INT,
curso_id INT,
data_matricula TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
status ENUM('ativa', 'concluida', 'cancelada') DEFAULT 'ativa',
FOREIGN KEY (aluno_id) REFERENCES Alunos(id),
FOREIGN KEY (curso_id) REFERENCES Cursos(id)
);