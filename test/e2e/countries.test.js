const request = require('./request');
const assert = require('chai').assert;
const Country = require('../../lib/models/Country');
const User = require('../../lib/models/User');
const genUsers = require('../../lib/utils/genUsers');


describe('Country routes', () => {

    before(() => {
        if(User.findOne({})) User.collection.drop();
    });

    let token = null;
    before(() => {
        genUsers(1).then(([user]) => {
            ({token} = user);
        });
    });

    let testCountry = null;
    it('has countries to get',() => {
        return Country.findOne({})
            .then(res => {
                testCountry = res;
            });
    }); 

    it('gets all the countries', () => {
        return request.get('/api/countries')
            .then(({ body }) => {
                assert.ok(body.length, 222);
            });
    });

    it('gets a country by id', () => {
        return request.get(`/api/countries/${testCountry._id}`)
            .set({Authorization: token})
            .then(({ body }) => {
                assert.ok(body.climate);
                assert.equal(body.population, testCountry.population);
            });
    });
});