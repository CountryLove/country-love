const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('./utils/error-handler');
const auth = require('./routes/auth');
const experiences = require('./routes/experiences');
const agg = require('./routes/agg');

app.use(express.static('public'));

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(bodyParser.json());

const countries = require('./routes/countries');
app.use('/api/countries', countries);

const users = require('./routes/users');
app.use('/api/users', users);

app.get('/', (req, res) => res.send('hello country lovers'));

app.use('/api/auth', auth);
app.use('/api/experiences', experiences);
app.use('/api/agg', agg);

app.use(errorHandler());

module.exports = app;