const request = require('./request');
const assert = require('chai').assert;
const mongoose = require('mongoose');

describe.skip('Country routes', () => {
    beforeEach(() => mongoose.connection.dropDatabase());

    it('gets all the countries', () => {
        return request.get('/api/countries')
            .then(({ body }) => {
                assert.ok(body.name);
            });
    });

    it('gets a country by id', () => {
        return request.get('/api/countries/putActuallIdHere!!!')
            .then(({ body } ) => {
                assert.ok(body.name);
            });
    });
});