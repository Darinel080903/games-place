const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

import UserRoutes from './routes/user.routes'
import GamesRoutes from './routes/game.routes'
import OrderRoutes from './routes/order.routes'

//port
app.set('port', 4000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use('/api/users', UserRoutes);
app.use('/api/games', GamesRoutes);
app.use('/api/orders', OrderRoutes);

export default app;



