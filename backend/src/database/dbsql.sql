CREATE DATABASE games_place;

USE games_place;

CREATE TABLE users (
	id INT AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    address VARCHAR(100),
    is_admin BOOLEAN,
    PRIMARY KEY(id)
);

