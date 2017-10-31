const request = require('./request');
const assert = require('chai').assert;
const mongoose = require('mongoose');
const auth = require('../../lib/routes/auth'); //eslint-disable-line
// const db = require('./db');

describe('Authorization route', () => {
    beforeEach(() => mongoose.connection.dropDatabase());
    
    let token = null;
    let userData = {
        name: 'Chris',
        password: 'abcd',
        email: 'me@me.com'
    };

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(userData)
            .then(({ body }) => token = body.token);
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

        
    it.skip('sign in - checks that username and password match and returns token', () => {
        return request
            .post('/api/auth/signin')
            .send({ password: userData.password, email: userData.email })
            .then(({ body }) => {
                assert.isOk(body.token);
            });
        // .catch(err => {
        //     console.log(err)
        // });
                
    });
   

});
