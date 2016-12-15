DROP DATABASE IF EXISTS game;
CREATE DATABASE game;

\c game;

CREATE TABLE scores (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  score VARCHAR
);

INSERT INTO scores (name, score)
  VALUES ('', '0');
