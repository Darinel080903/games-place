module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        first_name: {
            type: type.STRING
        },

        last_name: {
            type: type.STRING
        },
        
        email: {
            type: type.STRING
        },

        password: {
            type: type.STRING
        },

        address: {
            type: type.STRING
        },
    })
}