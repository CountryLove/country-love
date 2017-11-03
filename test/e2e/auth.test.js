const request = require('./request');
const assert = require('chai').assert;
const auth = require('../../lib/routes/auth'); //eslint-disable-line
const faker = require('faker');

describe('Authorization route', () => {

    let uniquifier = faker.name.firstName();

    let token = null;
    let userData = {
        name: 'Chris',
        password: 'abcd',
        email: `${uniquifier}@${faker.name.lastName()}.com`
    };

    before(() => {
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
                    assert.equal(err.status, 404);
                }
            );
    });

        
    it('sign in - checks that username and password match and returns token', () => {
        userData.email = `${uniquifier}@${faker.name.lastName()}.com`;
        
        return request
            .post('/api/auth/signin')
            .send({ password: userData.password, email: userData.email })
            .then(({ body }) => {
                assert.isOk(body.token);
            })
            .catch(err => {
                console.log(err.body); //eslint-disable-line
            });
                
    });
   

});
