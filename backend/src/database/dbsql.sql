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
    game_type VARCHAR(100),
    price VARCHAR(100),
    clasification VARCHAR(100),
    image VARCHAR(1000),
    stock INT,
    PRIMARY KEY(id)
);

CREATE TABLE user_order(
	id INT AUTO_INCREMENT,
    user_id INT,
	PRIMARY KEY(id),
    CONSTRAINT fk_id
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_item(
    order_id INT,
    game_id INT,
    CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES user_order(id),
	CONSTRAINT fk_product_id FOREIGN KEY (game_id) REFERENCES game(id)
);

SELECT * FROM users;
SELECT * FROM game;
SELECT * FROM user_order;
SELECT * FROM order_item;


SELECT user_order.id, user_order.user_id, game.title FROM user_order
INNER JOIN order_item ON order_item.order_id = user_order.id
INNER JOIN game ON game.id = order_item.game_id AND user_order.user_id =2;
