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

export const methods = {
    getGames
 }