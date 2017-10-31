const { assert } = require('chai');
const request = require('./request');
// const Experience = require('../../lib/models/Experience');
// const ensureAuth = require('../../lib/utils/ensure-auth');
const tokenService = require('../../lib/utils/token-service');
// const { Schema } = require('mongoose');


describe('experience API', () => {
    
    // beforeEach(() => Experience.collection.drop());

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