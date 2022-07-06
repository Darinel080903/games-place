import Sequelize from "sequelize"

export const sequelize = new Sequelize('games_place', 'root', '290220', {
    host: 'localhost',
    dialect: 'mysql'
})