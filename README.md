# Agenda Rômulo - Backend

Backend desenvolvido com Node.js utilizando express.js

## Instalação

Use gerenciador de pacotes/dependências [yarn](https://yarnpkg.com/) para carregar as dependências e pacotes do projeto.

```bash
yarn install
```

## Criação do banco de dados:

```mysql
DROP DATABASE if EXISTS agenda_esportiva;
CREATE DATABASE agenda_esportiva;
USE agenda_esportiva;

CREATE TABLE if not exists atividade (
   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   nome VARCHAR(150),
   descricao VARCHAR(150),
   id_atividade_origem INT DEFAULT null
) ENGINE=INNODB;

CREATE TABLE config_estabelecimento_esportivo (
   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   nome VARCHAR(150),
   maximo_recorrencia INT
) ENGINE=INNODB;

INSERT INTO config_estabelecimento_esportivo VALUES
(NULL, "Goat Me - Romulo", 10);

CREATE TABLE horarios (
   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   data_evento DATE,
   hora_inicio TIME,
   hora_fim TIME,
   id_estabelecimento_esportivo INT,
   id_atividade INT DEFAULT NULL,
   FOREIGN KEY (id_estabelecimento_esportivo) REFERENCES config_estabelecimento_esportivo(id),
   FOREIGN KEY (id_atividade) REFERENCES atividade(id)
) ENGINE=INNODB;


DELIMITER $$

CREATE PROCEDURE criarHorariosDisponiveis()
BEGIN
    DECLARE dataHorarioDisponivel DATE DEFAULT null;

    SET dataHorarioDisponivel =  DATE("2021-03-28");

    REPEAT
      INSERT INTO horarios VALUES
         (null, dataHorarioDisponivel, "06:00", "07:00", 1, null),
         (null, dataHorarioDisponivel, "07:00", "08:00", 1, null),
         (null, dataHorarioDisponivel, "08:00", "09:00", 1, null),
         (null, dataHorarioDisponivel, "09:00", "10:00", 1, null),
         (null, dataHorarioDisponivel, "10:00", "11:00", 1, null),
         (null, dataHorarioDisponivel, "11:00", "12:00", 1, null),
         (null, dataHorarioDisponivel, "12:00", "13:00", 1, null),
         (null, dataHorarioDisponivel, "13:00", "14:00", 1, null),
         (null, dataHorarioDisponivel, "14:00", "15:00", 1, null),
         (null, dataHorarioDisponivel, "15:00", "16:00", 1, null),
         (null, dataHorarioDisponivel, "16:00", "17:00", 1, null),
         (null, dataHorarioDisponivel, "17:00", "18:00", 1, null),
         (null, dataHorarioDisponivel, "18:00", "19:00", 1, null),
         (null, dataHorarioDisponivel, "19:00", "20:00", 1, null),
         (null, dataHorarioDisponivel, "20:00", "21:00", 1, null),
         (null, dataHorarioDisponivel, "21:00", "22:00", 1, null),
         (null, dataHorarioDisponivel, "22:00", "23:00", 1, NULL);

       SET dataHorarioDisponivel = DATE_ADD(dataHorarioDisponivel, INTERVAL 1 DAY);

    UNTIL dataHorarioDisponivel = DATE("2022-01-01")
    END REPEAT;
END$$

DELIMITER ;

CALL criarHorariosDisponiveis();

```
