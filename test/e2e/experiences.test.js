const { assert } = require('chai');
const request = require('./request');
const Experience = require('../../lib/models/Experience');
const User = require('../../lib/models/User');
const tokenService = require('../../lib/utils/token-service');


describe('experience API', () => {
    
    let savedExp = null;
    let token = '';
    let testUser = {
        name: 'Persona Peters',
        email: 'person@email.com', 
        password: 'personpass'
    };

    before(() => {
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

    it('posts an experience', () => {
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

    it('updates experience with id', () => {
        return request.post('/api/experiences')
            .set({Authorization: token })
            .send({
                country: '59f8a92964922f0d70faf32d',
                user: testUser._id,
                comment: 'OMFG tapas!',
                rating: '5'
            })
            .then(res => {
                savedExp = res.body;
            })
            .then(() => {
                return request.patch(`/api/experiences/${savedExp._id}`)
                    .set({Authorization: token })
                    .send({comment: 'Awesome tapas!'})
                    .then(res => {
                        assert.equal(res.body.comment,'Awesome tapas!');
                    });
            });
    });

    it('Deletes an experience', () => {
        return request.delete(`/api/experiences/${savedExp._id}`)
            .set({Authorization: token })
            .then(({ body: status }) => assert.deepEqual(status, { removed: true }));

    });
   
});