module.exports = (sequelize, type) => {
    return sequelize.define('product', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        image:{
            type: type.STRING
        },
        
        title: {
            type: type.STRING
        },

        stock: {
            type: type.INTEGER
        },
        
        price: {
            type: type.INTEGER
        }

    })
}