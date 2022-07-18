import { getConnection } from '../database/database'

const getUsers = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM users')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM users WHERE id=?', id)
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

const addUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, address, is_admin } = req.body;

        if(first_name === '' || last_name === '' || email === '' || password === '' || address === ''
            || first_name === undefined || last_name === undefined || email === undefined || password === undefined || address === undefined) {
            return res.status(400).json({message: 'Missing data' })
        }

        const connection = await getConnection();
        await connection.query('INSERT INTO users SET ?', { first_name: first_name, last_name: last_name, email: email, password: password, address: address, is_admin: is_admin }) 

        return res.json({message: 'User created successfuly'})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        await connection.query('DELETE FROM users WHERE id=?', id)

        return res.json({message: 'User deleted successfuly'})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, password, address, is_admin } = req.body;

        if (first_name === '' || last_name === '' || email === '' || password === '' || address === '' || is_admin === '') {
            return res.status(400).json({message: 'Missing data' })
        }

        const user = { first_name, last_name, email, password, address, is_admin };

        const connection = await getConnection();
        const result = await connection.query("UPDATE users SET ? WHERE id = ?", [user, id]);
        res.json(result);
    }
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


export const methods = {
   getUsers,
   getUser,
   addUser,
   deleteUser,
   updateUser
}