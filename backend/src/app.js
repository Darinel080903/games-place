const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

import UserRouters from './routes/user.routes'

//port
app.set('port', 4000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use('/api', UserRouters);

export default app;



