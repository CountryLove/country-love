const { assert } = require('chai');
const request = require('./request');
const Experience = require('../../lib/models/Experience');
// const ensureAuth = require('../../lib/utils/ensure-auth');


describe('experience API', () => {
    
    beforeEach(() => Experience.collection.drop());

    let token = '';

    beforeEach(() => {
        return request
            .post('/signup')
            .send({
                name: 'Persona Peters',
                email: 'person@email.com'
            })
            .then(({ body }) => token = body.token);
    });

    it('posts an experience', () => {
        return request.post('/experiences')
            .set({Authorization: token })
            .send({
                country: 'Spain',
                user: 'Gina',
                comment: 'OMFG tapas!',
                rating: '5'
            })
            .then(res => assert.ok(res.body._id));
    });
});