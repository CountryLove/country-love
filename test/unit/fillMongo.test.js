const fillMon = require('../../lib/utils/fillMongo.js');
const schematize = require('../../lib/utils/schematize');
const genUsers = require('../../lib/utils/genUsers');

const Country = require('../../lib/models/Country');


const {assert} = require('chai');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const testUri = 'mongodb://localhost:27017/country-love-test';
mongoose.connect(testUri, {useMongoClient: true});


/**************************************
 * Purpose:
 *  - pull the files from the cloned factbook.json folder 
 *          (in same folder as repo root; not in repo itself)
 *  - translate them to mongoose Country schema
 * 
 *  - use by unskipping 'RUN' describe function and running npm test ONCE
 *  - add skip again when db is populated
 */

describe.skip('POPULATE COUNTRIES', () => {

    describe('fillMongo', () => {
        it('fills the db with factbook data', () => {
            assert.ok(fillMon());
    
        });
    });
    
    describe('schematize:     THIS SHOULD FAIL WITH TIMEOUT ERROR', () => {
        before(() => {
            if(Country.collection.findOne({})) Country.collection.drop();
        });
    
        it('pulls the database info and puts it into a schema', done => {
            assert.ok(schematize(done));
        });
    });
});


describe.skip('POPULATE USERS', () => {
    it('fills user collection', () => {
        genUsers(100).then((users) => {
            console.log(`created ${users.length} users`); // eslint-disable-line
        });
    });
});


describe.only('POPULATE EXPERIENCES', () => {
    it('fills experiences collection', () => {
        genExps(1000).then((expIds) => {
            assert.ok(expIds);
        });
    });
});

