var user = 'CREATE TABLE IF NOT EXISTS users (\
	id INT AUTO_INCREMENT,\
    first_name VARCHAR(100),\
    last_name VARCHAR(100),\
    email VARCHAR(100) unique,\
    password VARCHAR(100),\
    address VARCHAR(100),\
    is_admin BOOLEAN,\
    PRIMARY KEY(id)\
    );'

var game = 'CREATE TABLE IF NOT EXISTS game (\
	id INT AUTO_INCREMENT,\
    title VARCHAR(100),\
    game_type VARCHAR(100),\
    price VARCHAR(100),\
    clasification VARCHAR(100),\
    image VARCHAR(1000),\
    stock INT,\
    PRIMARY KEY(id)\
    );'

var user_order = 'CREATE TABLE IF NOT EXISTS user_order(\
	id INT AUTO_INCREMENT,\
    user_id INT,\
	PRIMARY KEY(id),\
    CONSTRAINT fk_id\
    FOREIGN KEY (user_id) REFERENCES users(id)\
    );'

var order_item = 'CREATE TABLE IF NOT EXISTS order_item(\
    order_id INT,\
    game_id INT,\
    CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES user_order(id),\
	CONSTRAINT fk_product_id FOREIGN KEY (game_id) REFERENCES game(id)\
    );'

module.exports = {user, game, user_order, order_item}