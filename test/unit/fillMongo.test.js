const fillMon = require('../../lib/utils/fillMongo.js');
const {assert} = require('chai');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const testUri = 'mongodb://localhost:27017/country-love-test';
mongoose.connect(testUri, {useMongoClient: true});

describe('fillMon', () => {
    it('fills the db with factbook data', () => {
        assert.ok(fillMon());

    });
});


