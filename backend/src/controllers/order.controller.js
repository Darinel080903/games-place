import { getConnection } from '../database/database'
import { generateUniqueId } from '../utils/uniqueId';

const getOrders = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT user_order.id as order_id, user_order.user_id,\
                                                order_detail.id as game_in_order_id,\
                                                order_detail.quantity,\
                                                order_detail.unique_id,\
                                                order_detail.status,\
                                                users.email,\
                                                game.id as game_id,\
                                                game.title as game_title,\
                                                game.game_type,\
                                                game.price,\
                                                game.clasification,\
                                                game.image,\
                                                game.stock FROM user_order\
                                                INNER JOIN order_detail ON order_detail.order_id = user_order.id\
                                                INNER JOIN users ON users.id = user_order.user_id\
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
                                                order_detail.status,\
                                                order_detail.quantity,\
                                                game.id as game_id,\
                                                game.title as game_title,\
                                                game.game_type,\
                                                game.price,\
                                                game.platform,\
                                                game.clasification,\
                                                game.image,\
                                                game.stock FROM user_order\
                                                INNER JOIN order_detail ON order_detail.order_id = user_order.id\
                                                INNER JOIN game ON game.id = order_detail.game_id AND user_order.id=?', id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const addOrder = async (req, res) => {
    try {
        const { user_id, game_id, quantity } = req.body;
        const connection = await getConnection();
        //if user has no order, create one and create order_detail
        const result = await connection.query('SELECT * FROM user_order WHERE user_id=?', user_id);

        console.log(result.length);
        if (result.length === 0) {
            var unique_id = generateUniqueId({length: 6});

            console.log(unique_id);

            await connection.query('INSERT INTO user_order SET ?', { user_id: user_id});
            const order_id = await connection.query('SELECT id FROM user_order WHERE user_id=?', user_id);
            await connection.query('INSERT INTO order_detail SET ?', { order_id: order_id[0].id, game_id: game_id, quantity: quantity, unique_id: unique_id});
        }else{
            var unique_id = generateUniqueId({length: 6});

            console.log(unique_id);
            await connection.query('INSERT INTO order_detail SET ?', { order_id: result[0].id, game_id: game_id, quantity: quantity, unique_id: unique_id});
        }

        res.json({ message: 'Order created successfuly' });
        
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error.message);
    }
}

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, game_id, unique_id, quantity } = req.body;
        const connection = await getConnection();
        await connection.query('UPDATE user_order SET ? WHERE id=?', [{ user_id: user_id }, id]);
        await connection.query('UPDATE order_detail SET ? WHERE order_id=? AND game_id=?', [{ quantity: quantity }, id, game_id]);
        res.json({ message: 'Order updated successfuly' });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const updateOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const connection = await getConnection();
        await connection.query('UPDATE order_detail SET ? WHERE id=?', [{ status: status }, id]);
        res.json({ message: 'Order updated successfuly' });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        await connection.query('DELETE FROM user_order WHERE id=?', id);
        res.json({ message: 'Order deleted successfuly' });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getOrderByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const connection = await getConnection();
        const result = await connection.query('SELECT user_order.id as order_id, user_order.user_id,\
                                                order_detail.id as game_in_order_id,\
                                                order_detail.unique_id,\
                                                order_detail.quantity,\
                                                order_detail.status,\
                                                game.id as game_id,\
                                                game.title as game_title,\
                                                game.game_type,\
                                                game.price,\
                                                game.platform,\
                                                game.clasification,\
                                                game.image,\
                                                game.stock FROM user_order\
                                                INNER JOIN order_detail ON order_detail.order_id = user_order.id\
                                                INNER JOIN game ON game.id = order_detail.game_id AND user_order.user_id=?', user_id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const deleteItemFromOrderDetail = async (req, res) => {
    try {
        const { unique_id } = req.body;
        const connection = await getConnection();
        await connection.query('DELETE FROM order_detail WHERE unique_id=?', unique_id);
        res.json({ message: 'Item deleted successfuly' });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const updateItemFromOrderDetailStatus = async (req, res) => {
    try {
        const { unique_id, status } = req.body;
        const connection = await getConnection();
        await connection.query('UPDATE order_detail SET ? WHERE unique_id=?', [{ status: status }, unique_id]);
        res.json({ message: 'Item updated successfuly' });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getOrderByUserAndGameId = async (req, res) => {
    try {
        const { user_id, game_id } = req.params;
        const connection = await getConnection();
        const result = await connection.query('SELECT user_order.id as order_id, user_order.user_id,\
                                                order_detail.id as game_in_order_id,\
                                                order_detail.unique_id,\
                                                order_detail.quantity,\
                                                order_detail.status,\
                                                game.id as game_id,\
                                                game.title as game_title,\
                                                game.game_type,\
                                                game.price,\
                                                game.platform,\
                                                game.clasification,\
                                                game.image,\
                                                game.stock FROM user_order\
                                                INNER JOIN order_detail ON order_detail.order_id = user_order.id\
                                                INNER JOIN game ON game.id = order_detail.game_id AND user_order.user_id=? AND order_detail.game_id=? AND order_detail.status="Disponible"', [user_id, game_id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


export const methods = {
    getOrders,
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderByUser,
    updateOrderDetail,
    deleteItemFromOrderDetail,
    updateItemFromOrderDetailStatus,
    getOrderByUserAndGameId
}