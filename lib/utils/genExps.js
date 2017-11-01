const faker = require('faker');
const Experience = require('../models/Experience');
const Country = require('../models/Country');
const User = require('../models/User');

module.exports = quantity => {
    const getIds = [
        Country.find({}).select('_id').lean(),
        User.find({}).select('_id').lean()
    ];
    const expDataArr = [];

    return Promise.all(getIds)
        .then(([countries, users]) => {

            for(let i = 0; i < quantity; i++) {

                const randCountryIndex = Math.floor(Math.random() * countries.length);
                const randUserIndex = Math.floor(Math.random() * users.length);
                const varCommentLength = (roll) => {
                    if(roll < 0.20) return faker.lorem.sentence();
                    if(roll < 0.95) return faker.lorem.paragraph();
                    return faker.lorem.paragraphs();
                };
                const generateRating = () => {
                    const rrating = Math.floor((Math.random() * 6 + Math.random() * 7) /2) + 1;
                    if(rrating > 5) return 5;
                    return rrating;
                };
                const generateTags = (obj, numTags) => {
                    const arr = [];
                    let n = numTags || Math.floor((Math.random() * 10 + Math.random() * 10) /2) -3;
                    if(n <= 0) return;
                    for(let i = 0; i < n; i++) arr.push(faker.company.bsAdjective());
                    obj.tags = arr;
                };
                const generateCity = (obj, forceTrue) => {
                    if(forceTrue || Math.random() < 0.8) obj.city = faker.address.city();
                };


                let data = {
                    country: countries[randCountryIndex],
                    user: users[randUserIndex],
                    comment: varCommentLength(Math.random()),
                    rating: generateRating()
                };
                generateTags(data);
                generateCity(data);
                expDataArr.push(data);
            }


            const saveExps = expDataArr.map(data => new Experience(data).save());
            return Promise.all(saveExps);
        });
};