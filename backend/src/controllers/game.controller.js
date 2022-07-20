import { getConnection } from '../database/database'

const getGames = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM game');
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getGame = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM game WHERE id=?', id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const addGame = async (req, res) => {
    try {
        const { title, game_type, price, clasification, file, platform, stock  } = req.body;

        let image = `http://localhost:4000/images/${req.file.filename}`;
        const game = { title, game_type, price, clasification, image, platform, stock  };


        // if(title === '' || game_type === '' || price === '' || clasification === '' || stock === ''){
        //     return res.status(400).json({message: 'Missing data' })
        // }

        const connection = await getConnection();
        await connection.query('INSERT INTO game SET ?', game);
        res.json({message:'Game added succesfully'})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateGame = async (req, res) => {
    try {
        //solo actualizar los parametros recibidos y mantener los demas
        const { id } = req.params;
        
        const game = req.body;

        const connection = await getConnection();
        const result = await connection.query("UPDATE game SET ? WHERE id = ?", [game, id]);
        res.json({message: 'Game updated succesfully'}, result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const deleteGame = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM game WHERE id = ?", id);
        res.json(result);
    }
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const verifyStock = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT stock FROM game WHERE id = ?", id);
        res.json(result);
    }
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const reduceStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;
        const connection = await getConnection();
        const result = await connection.query("UPDATE game SET stock = stock - ? WHERE id = ?", [stock, id]);
        res.json(result);
    }
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


export const methods = {
    getGames,
    getGame,
    addGame,
    updateGame,
    deleteGame,
    verifyStock,
    reduceStock
 }