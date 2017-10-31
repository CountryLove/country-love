const request = require('./request');
const assert = require('chai').assert;
const Country = require('../../lib/models/Country');
const User = require('../../lib/models/User');
const { Generator } = require('mockdata-generator');


describe.only('Country routes', () => {

    before(() => {
        require('./test-gen');
        if(User.findOne({})) User.collection.drop();
    });

    let token = null;
    before(() => {
        let metaUser = {
            'name': 'test case',
            'metadata': [
                {
                    'attributeName': 'name',
                    'dataType': 'Name'
                },
                {
                    'attributeName': 'ipsum',
                    'dataType': 'Ipsum',
                    'wordMax': 1
                }
            ]
        };
        
        const genUserData = new Generator(metaUser);
        const userData = genUserData.getValue(1);
        console.log(userData);

        const purify = arr => arr.join('').split('').filter(char => /\w/.test(char)).join('');

        return request
            .post('/api/auth/signup')
            .send({
                name: userData.name,
                email: `${purify(userData.ipsum.split(' ').slice(1)).slice(-Math.random() * 10 - 1)}@mail.com`,
                password: `${purify(userData.ipsum.split(' ').slice(-2))}`,
                homebase: `${purify(userData.ipsum.split(' ').slice(0, -2)).slice(-7)}`
            })
            .then(({body}) => token = body.token);
    });

    let testCountry = null;
    it('has countries to get',() => {
        return Country.findOne({})
            .then(res => {
                testCountry = res;
            });
    }); 

    it('gets all the countries', () => {
        return request.get('/api/countries')
            .then(({ body }) => {
                assert.ok(body.length, 222);
            });
    });

    it('gets a country by id', () => {
        return request.get(`/api/countries/${testCountry._id}`)
            .set({Authorization: token})
            .then(({ body }) => {
                assert.ok(body.climate);
                assert.equal(body.population, testCountry.population);
            });
    });
});