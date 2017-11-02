const request = require('./request');
const assert = require('chai').assert;
// const agg = require('./routes/agg');

describe('Agg routes', () => {

    it('gets literacyGap agg', () => {
        return request.get('/api/agg/literacy')
            .then( ({ body }) => {
                assert.ok(body);
            });
    });

    it('gets cuontries with average ratings and # of experiences', () => {
        return request.get('/api/agg/avgRating')
            .then( ({ body }) => {
                assert.ok(body);
            });
    });
});