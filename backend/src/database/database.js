import mysql from 'promise-mysql'
import config from '../config'

const { user, game, user_order, order_detail} = require('../models/models')
const queries = [user, game, user_order, order_detail]

var connection;

mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password
}).then(function(conn){
    connection = conn;

    return connection.query('CREATE DATABASE IF NOT EXISTS ' + config.database)
}).then(() => {
    connection.query('USE ' + config.database)
    queries.forEach((query)=>connection.query(query))

})

const getConnection = () => { 
    return connection;
}

module.exports = {
    getConnection
}