import { getConnection } from '../database/database'
import BinarySearchTree from '../utils/BinaryTree'

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

        const connection = await getConnection();
        await connection.query('INSERT INTO game SET ?', game);
        res.json({message:'Game added succesfully'})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateGame = async (req, res) => {
    try {
        const { id } = req.params;

        if(req.file){

            const { title, game_type, price, clasification, file, platform, stock } = req.body;
            
            let image = `http://localhost:4000/images/${req.file.filename}`;
            var game = { title, game_type, price, clasification, image, platform, stock };
        }
        else{
            const { title, game_type, price, clasification, platform, stock } = req.body;
            var game = { title, game_type, price, clasification, platform, stock };
        }
        
        const connection = await getConnection();
        await connection.query('UPDATE game SET ? WHERE id = ?', [game, id]);
        
        res.json({message: 'Game updated succesfully'});
    } catch (error) {
        res.status(500);
        res.send(error.message);

    }
}

const updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        const connection = await getConnection();
        await connection.query('UPDATE game SET stock = ? WHERE id = ?', [stock, id]);
        res.json({message: 'Stock updated succesfully'});
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

//search with binary tree
const searchGame = async (req, res) => {
    try {
        const tree = new BinarySearchTree();
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM game');
        result.forEach(element => {
            tree.insert(element);
        })

        const { title } = req.params;
        const game = tree.searchNode(tree.getRootNode() ,title);
        res.json(game);
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
    reduceStock,
    updateStock,
    searchGame
 }