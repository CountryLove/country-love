const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const {execSync} = require('child_process');
const Country = require('../models/Country.js');

const testUri = 'mongodb://localhost:27017/country-love-test';
mongoose.connect(testUri, {useMongoClient: true});

const defaultUrl = '../factbook.json';
module.exports = (url = defaultUrl) => {
    try {
        let factbook = fs.readdirSync(url);
        factbook = factbook.filter(area => !area.split('').includes('.'));
        factbook.forEach(area => {
            let countries = fs.readdirSync(path.join(url, area));
            countries.forEach(country => {
                execSync(`mongoimport --db country-love-test --collection countriesRaw --file ${path.join(url, area, country)}`);
            });
        });
    }
    catch(err) {
        console.log('ERROR: fillMongo failed'); // eslint-disable-line
        console.log(err);                       // eslint-disable-line
    }

    return true;
};