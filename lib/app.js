const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('./utils/error-handler');
const auth = require('./routes/auth');

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(bodyParser.json());




app.use('/api/auth', auth);

app.use(errorHandler());

module.exports = app;