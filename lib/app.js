const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('./utils/error-handler');

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(bodyParser.json());


app.get('/', (req, res) => res.send('hello country lovers'));


app.use(errorHandler());
module.exports = app;