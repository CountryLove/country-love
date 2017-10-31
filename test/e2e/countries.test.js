const request = require('./request');
const assert = require('chai').assert;
const Country = require('../../lib/models/Country');

// const mongoose = require('mongoose');

describe('Country routes', () => {
    let testCountry = null;

    before(() => {
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
            .then(({ body }) => {
                assert.ok(body.climate);
                assert.equal(body.population, testCountry.population);
            });
    });
});