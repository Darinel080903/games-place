const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

//port
app.set('port', 4000);

//middlewares
app.use(morgan('dev'));
app.use(express.json())
app.use(cors());

//routes
// app.use('/api');

export default app;



