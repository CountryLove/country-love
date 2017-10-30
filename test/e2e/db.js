const connect = require('../../lib/connect');
const url = 'mongodb://localhost:27017/country-love-test';
const mongoose = require('mongoose');

before(() => connect(url));
after(() => mongoose.connection.close());