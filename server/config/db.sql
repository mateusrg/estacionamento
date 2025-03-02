CREATE DATABASE estacionamento;
USE estacionamento;

CREATE TABLE Vagas (
	idVaga INT PRIMARY KEY AUTO_INCREMENT,
    setor VARCHAR(1) NOT NULL,
    numeracao INT NOT NULL,
    eVagaEspecial BIT NOT NULL
);

CREATE TABLE Carros(
	idCarro INT PRIMARY KEY AUTO_INCREMENT,
    placa VARCHAR(7) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    cor VARCHAR(100) NOT NULL,
    dataHoraEntrada TIMESTAMP NOT NULL,
    dataHoraSaida TIMESTAMP,
    idVaga INT NOT NULL,
    FOREIGN KEY (idVaga) REFERENCES Vagas(idVaga)
);

INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('A', 1, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('A', 2, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('A', 3, 1);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('A', 4, 1);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('A', 5, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('A', 6, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('A', 7, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('A', 8, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('A', 9, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('A', 10, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('A', 11, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('A', 12, 0);

INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('B', 1, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('B', 2, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('B', 3, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('B', 4, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('B', 5, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('B', 6, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('B', 7, 1);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('B', 8, 1);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('B', 9, 1);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('B', 10, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('B', 11, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('B', 12, 0);

INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('C', 1, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('C', 2, 1);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('C', 3, 1);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('C', 4, 1);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('C', 5, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('C', 6, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('C', 7, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('C', 8, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('C', 9, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('C', 10, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('C', 11, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('C', 12, 0);

INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('D', 1, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('D', 2, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('D', 3, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('D', 4, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('D', 5, 1);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('D', 6, 1);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('D', 7, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('D', 8, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('D', 9, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('D', 10, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('D', 11, 0);
INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES ('D', 12, 0);