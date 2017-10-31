const request = require('./request');
const assert = require('chai').assert;
// const mongoose = require('mongoose');

describe('Country routes', () => {

    it('gets all the countries', () => {
        return request.get('/api/countries')
            .then(({ body }) => {
                assert.ok(body.length, 222);
            });
    });

    it('gets a country by id', () => {
        return request.get('/api/countries/59f89fe14cdc972ce66b4e38')
            .then(({ body }) => {
                assert.ok(body.climate);
                assert.equal(body.population, 20172332);
            });
    });
});