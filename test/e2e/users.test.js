const request = require('./request');
const assert = require('chai').assert;
const tokenService = require('../../lib/utils/token-service');
const User = require('../../lib/models/User');

describe('Country routes', () => {
    let token = null;
    let testUser = {
        name: 'Mr. CountryLovaa',
        email: 'love@countryfact.com',
        password: 'secret'
    };

    before(() => {
        return request.post('/api/auth/signup')
            .send(testUser)
            .then(({ body }) => {
                token = body.token;
                return tokenService.verify(token);
            })
            .then((res) => {
                testUser._id = res.id;
            });     
    });
  
    it('updates user with id', () => {
        return request.patch(`/api/users/${testUser._id}`)
            .set('Authorization', token)
            .send({name: 'Mrs. CountryLovaa'})
            .then(({ body }) => {
                assert.equal(body.name, 'Mrs. CountryLovaa');
            });
           
    });

    it('deletes user with id', () => {
        return request.delete(`/api/users/${testUser._id}`)
            .set('Authorization', token)
            .then(({ body }) => {
                assert.deepEqual(body, { removed: true });
            });
           
    });
});