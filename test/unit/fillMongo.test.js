const fillMon = require('../../lib/utils/fillMongo.js');
const schematize = require('../../lib/utils/schematize');
const genUsers = require('../../lib/utils/genUsers');
const genExps = require('../../lib/utils/genExps');

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
describe('POPULATE DATABASE', () => {
    describe('COUNTRIES', () => {

        describe('raw World Factbook data', () => {
            it('fills countriesRaw collection', () => {
                assert.ok(fillMon());
        
            });
        });
        
        describe.only('countries collection', () => {
            before(() => {
                if(Country.collection.findOne({})) Country.collection.drop();
            });
        
            it('populates countries collection via countriesRaw data', done => {
                assert.ok(schematize(done));
            });
        });
    });


    describe('USERS', () => {
        it('populates users collection', () => {
            genUsers(100).then((users) => {
                console.log(`created ${users.length} users`); // eslint-disable-line
            });
        });
    });


    describe('EXPERIENCES', () => {
        it('populates experiences collection', done => {
            genExps(2000)
                .then((exps) => {
                    assert.ok(exps);
                    done();
                });
        });
    });
});

