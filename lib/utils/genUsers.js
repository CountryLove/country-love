const { Generator } = require('mockdata-generator');
const bcrypt = require('bcryptjs');
const tokenService = require('./token-service');
const User = require('../models/User');

module.exports = (quantity) => {
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

    const genData = new Generator(metaUser);
    const data = genData.getValue(quantity);

    const purify = arr => arr.join('').split('').filter(char => /\w/.test(char)).join('');
    const build = d => ({
        name: d.name,
        email: `${purify(d.ipsum.split(' ').slice(1)).slice(-Math.random() * 10 - 1)}@mail.com`,
        password: `${purify(d.ipsum.split(' ').slice(-2))}`,
        homebase: `${purify(d.ipsum.split(' ').slice(0, -2)).slice(-7)}`
    });

    let usersData = null;
    if(quantity === 1) usersData = [build(data)];
    else usersData = data.map(userRawData => build(userRawData));

    const saveUsers = usersData.map(userRawData => {
        const {password} = userRawData;
        delete userRawData.password;
        const newUser = new User(userRawData);
        newUser.generateHash(password);
        return newUser.save();
    });

    return Promise.all(saveUsers)
        .then(users => {
            const getTokens = users.map(monRes => tokenService.sign(monRes));
            return Promise.all(getTokens)
                .then(tokens => {
                    let i = 0;
                    return new Promise((resolve) => {
                        resolve(users.map(monRes => ({'user': monRes, 'token': tokens[i++]})));
                    }); 
                });
        })
        .catch(err => {
            debugger;
        });
};