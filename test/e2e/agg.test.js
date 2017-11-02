const request = require('./request');
const assert = require('chai').assert;
// const agg = require('./routes/agg');

describe.only('Agg routes', () => {

    it('gets literacyGap agg', () => {
        return request.get('/api/agg/literacy')
            .then( ({ body }) => {
                assert.ok(body);
            });
    });

    it('gets countries with average ratings and # of experiences', () => {
        return request.get('/api/agg/avgRating')
            .then( ({ body }) => {
                assert.ok(body);
            });
    });

    it('gets the average percentage of internet users per country sorted from lowest to highest', () => {
        return request.get('/api/agg/internetUsers')
            .then( ({ body }) => {
                assert.ok(body);
            });
    });
    
    it('gets percentage of children used in child labor per country', () => {
        return request.get('/api/agg/avgRating')
            .then( ({ body }) => {
                assert.ok(body);
            });
    });
        
    it('gets all english speaking countries', () => {
        return request.get('/api/agg/countriesByLang?language=Spanish')
            .then( ({ body }) => {
                assert.ok(body);
            });
    });
            
    it('returns user\'s country log', () => {
        return request.get('/api/agg/userCountryLog?username=Sam Hood')
            .then( ({ body }) => {
                assert.ok(body);
            });
    });
});