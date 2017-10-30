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
            .then(({ body }) => token = body.token);
    });

    describe('signup', () => {
        let userData = null;

        beforeEach(() => {
            userData = {
                name: 'bob',
                email:  'userdude@people.com',
                password: 'FUTrump'
            };

            return request.post('/api/auth/signup')
                .send(userData);
        });

        it('signs up a user and returns their token', () => {
            assert.ok(token);
        });

        it('Can not sign up with same email', () => {
            return request
                .post('/api/auth/signup')
                .send({ password: userData.password, email: userData.email })
                .then(
                    () => { throw new Error ('Unexpected successful response');},
                    err => {
                        assert.equal(err.status, 400);
                    }
                );
        });

    });

    it.only('sign in - checks that username and password match and returns token', () => {
        return request.post('/api/auth/signin')
            .send({ email: 'othersuer@gmail.com', password: 'nah'})
            .then(({ body }) => {
                assert.isOk(body.token);
            });
        
    });

});