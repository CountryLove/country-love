const request = require('./request');
const assert = require('chai').assert;
const mongoose = require('mongoose');

describe('Authorization route', () => {
    beforeEach(() => mongoose.connection.dropDatabase());

    let token = null;
    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                name: 'Chris',
                password: 'abcd',
                email: 'me@me.com'
            })
            .then(({ body }) => token = body.token);
    });

    describe('signup', () => {
        it('signs up a user and returns their token', () => {
            assert.ok(token);
        });
    });

});