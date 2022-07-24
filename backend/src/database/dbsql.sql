CREATE DATABASE games_place;

USE games_place;

CREATE TABLE users (
	id INT AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100) unique,
    password VARCHAR(100),
    address VARCHAR(100),
    is_admin BOOLEAN,
    PRIMARY KEY(id)
);

CREATE TABLE game (
	id INT AUTO_INCREMENT,
    title VARCHAR(100),
    game_type ENUM("Puzzle", "Arcade", "Simulation", "RPG", "Shooter", "Sports", "Driving"),
    price VARCHAR(100),
    clasification ENUM("eC", "E", "E10+", "T", "M17+", "A18+"),
    image VARCHAR(1000),
    platform ENUM('ps4','xbox'),
    stock INT,
    PRIMARY KEY(id)
);

CREATE TABLE user_order(
	id INT AUTO_INCREMENT,
    user_id INT unique,
	PRIMARY KEY(id),
    CONSTRAINT fk_id
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

INSERT INTO user_order VALUES(1, 1);

CREATE TABLE order_detail(
	id INT AUTO_INCREMENT,
    order_id INT,
    game_id INT,
    quantity INT,
    unique_id VARCHAR(100) unique,
    status ENUM("Disponible", "Rentado", "Entregado") DEFAULT "Disponible",
    primary key(id),
    CONSTRAINT fk_order_id
    FOREIGN KEY (order_id) REFERENCES user_order(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_game_id
    FOREIGN KEY (game_id) REFERENCES game(id)
    ON DELETE CASCADE
);

SELECT * FROM users;
SELECT * FROM game;
SELECT * FROM user_order;
SELECT * FROM order_detail;

SELECT * FROM user_order
INNER JOIN order_detail ON order_detail.order_id = user_order.id
INNER JOIN game ON game.id = order_detail.game_id AND user_order.user_id =1;

SELECT user_order.id as order_id, user_order.user_id,
order_detail.id as game_in_order_id,
order_detail.quantity,
game.id as game_id,
game.title as game_title,
game.game_type,
game.price,
game.clasification,
game.image,
game.stock FROM user_order
INNER JOIN order_detail ON order_detail.order_id = user_order.id
INNER JOIN game ON game.id = order_detail.game_id AND user_order.user_id=1;

CREATE VIEW V_users
AS SELECT *
FROM users;

CREATE VIEW V_games
AS SELECT *
FROM game;

CREATE VIEW V_orders
AS SELECT *
FROM user_order;

SELECT * FROM V_users;


