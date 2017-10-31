const { assert } = require('chai');
const request = require('./request');
const Experience = require('../../lib/models/Experience');
const User = require('../models/User');
const tokenService = require('../../lib/utils/token-service');


describe('experience API', () => {
    
    beforeEach(() => Experience.collection.drop());
    beforeEach(() => User.collection.drop());

    let token = '';
    let testUser = {
        name: 'Persona Peters',
        email: 'person@email.com', 
        password: 'personpass'
    };

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(testUser)
            .then(({ body }) => {
                token = body.token;
                return tokenService.verify(token);
            })
            .then((res) => {
                testUser._id = res.id;
            });
    });

    it.only('posts an experience', () => {
        return request.post('/api/experiences')
            .set({Authorization: token })
            .send({
                country: '59f8a92964922f0d70faf32d',
                user: testUser._id,
                comment: 'OMFG tapas!',
                rating: '5'
            })
            .then(res => assert.ok(res.body._id));
    });
});