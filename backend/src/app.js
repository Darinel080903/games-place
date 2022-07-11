const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

import UserRoutes from './routes/user.routes'
import GamesRoutes from './routes/game.routes'

//port
app.set('port', 4000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use('/api/users', UserRoutes);
app.use('/api/games', GamesRoutes);

export default app;



