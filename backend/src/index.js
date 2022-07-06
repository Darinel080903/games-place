import app from './app.js'
import { sequelize } from './database/database.js';

const port = process.env.PORT || 3000


async function main() {

    try {
        await sequelize.authenticate();
        console.log("Connection has been established succesfully")
        app.get('/', (req, res) => {
            res.send('Hola mundo');
        });

        app.listen(port, () => {
            console.log('Server started on port: ', port)
        })
    }
    catch(error){
        console.error("Unable to connect to the database:", error)
    }
    
}

main()