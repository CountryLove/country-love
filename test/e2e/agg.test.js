const request = require('./request');
const assert = require('chai').assert;
// const agg = require('./routes/agg');

describe('Agg routes', () => {

    it.only('gets literacyGap agg', () => {
        return request.get('/api/agg/literacy')
            .then( ({ body }) => {
                assert.ok(body);
            });
    });
});