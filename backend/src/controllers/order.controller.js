import { getConnection } from '../database/database'

const getOrders = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT user_order.id as order_id, user_order.user_id,\
                                                order_detail.id as game_in_order_id,\
                                                order_detail.quantity,\
                                                game.id as game_id,\
                                                game.game_type,\
                                                game.price,\
                                                game.clasification,\
                                                game.image,\
                                                game.stock FROM user_order\
                                                INNER JOIN order_detail ON order_detail.order_id = user_order.id\
                                                INNER JOIN game ON game.id = order_detail.game_id;');
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query('SELECT user_order.id as order_id, user_order.user_id,\
                                                order_detail.id as game_in_order_id,\
                                                order_detail.quantity,\
                                                game.id as game_id,\
                                                game.game_type,\
                                                game.price,\
                                                game.clasification,\
                                                game.image,\
                                                game.stock FROM user_order\
                                                INNER JOIN order_detail ON order_detail.order_id = user_order.id\
                                                INNER JOIN game ON game.id = order_detail.game_id AND user_order.user_id=?', id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const addOrder = (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const methods = {
    getOrders,
    getOrder
 }