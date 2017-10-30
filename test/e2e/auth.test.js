const request = require('./request');
const assert = require('chai').assert;
const mongoose = require('mongoose');
const auth = require('../../lib/routes/auth'); //eslint-disable-line
// const db = require('./db');

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
            .then(({ body }) => token = body.token)
            .catch(err => {
                console.log('thar be an error');
            });
    });

    describe('signup', () => {
        it('signs up a user and returns their token', () => {
            assert.ok(token);
        });

        it('Can not sign up with same email', () => {
            return request
                .post('/api/auth/signup')
                .send({ email: 'user', password: 'def' })
                .then(
                    () => { throw new Error ('Unexpected successful response');},
                    err => {
                        assert.equal(err.status, 400);
                    }
                );
        });



    });

});