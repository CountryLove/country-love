const Country = require('../models/Country.js');
const { MongoClient } = require('mongodb');
const convertToNumber = require('./convertToNumber');
const constructBulldozer = require('./bulldozer');

const testUri = 'mongodb://localhost:27017/country-love-test';

// bulldoze over errors arising from missing data

module.exports = done => {
    MongoClient.connect(testUri, (err, db) => {
        try {
            if(err) console.log('ERROR: mongoclient in schematize'); // eslint-disable-line
            else console.log('Mongo Client connected to ', db.s.databaseName, ' in schematize'); // eslint-disable-line
            
            const rawDataColl = db.collection('countriesRaw');
            rawDataColl.find({}).toArray((err, rawData) => {
                let i = 0;
                rawData.forEach(raw => {

                    const country = new Country({});
                    let bulldoze = constructBulldozer(country);
                    bulldoze('name', () => raw.Government['Country name']['conventional short form'].text);
                    bulldoze('capital', () => raw.Government.Capital.name.text);
                    bulldoze('population',() => raw['People and Society'].Population.text.split(' ')[0].split(',').join(''));
                    bulldoze('population_distribution', () => raw['People and Society']['Population distribution'].text);
                    bulldoze('coordinates', () => raw.Geography['Geographic coordinates'].text);
                    bulldoze('area_comparative', () => raw.Geography['Area - comparative'].text);
                    bulldoze('climate', () => raw.Geography.Climate.text);
                    bulldoze('ethnic_groups', () => raw['People and Society']['Ethnic groups'].text);
                    bulldoze('religions', () => raw['People and Society']['Religions'].text.split(', '));
                    bulldoze('mothers_age_first_birth', () => parseFloat(raw['People and Society']['Mother\'s mean age at first birth'].text.split(' ')[0]));
                    bulldoze('life_expectancy', () => parseFloat(raw['People and Society']['Life expectancy at birth']['total population'].text.split(' ')[0]));
                    bulldoze('contraceptive_prevalence_rate', () => parseFloat(raw['People and Society']['Contraceptive prevalence rate'].text.split('%')[0]) / 100);
                    bulldoze('physicians_density', () => parseFloat(raw['People and Society']['Physicians density'].text) / 1000);
                    bulldoze('time_difference', () => raw.Government.Capital['time difference'].text);
                    bulldoze('exchange_rate', () => raw.Economy['Exchange rates'].text);

                  
                    bulldoze('languages', () => {
                        const rawLanguages = raw['People and Society']['Languages'].text.split(', ');
                        const languages = {};
                        languages.all = rawLanguages.map(dataStr => {
                            dataStr = dataStr.split(' ');

                            const langObj = {};
                            if(/\d+/.test(dataStr[0])) langObj.language = dataStr.slice(0, 3).join(' ');
                            else langObj.language = dataStr[0];
                            const percentageGet = dataStr.filter(word => word.includes('%'));
                            if(percentageGet.length > 0) langObj.percentage = parseFloat(percentageGet[0].slice(0, -1));
                            
                            const officialGet = dataStr.filter(word => word.includes('official'));
                            if(officialGet.length > 0 && languages.official) languages.official.push(langObj);
                            else languages.official = [langObj];

                            return langObj;
                        });
                        return languages;
                    });

                    bulldoze = constructBulldozer(country.literacy);
                    bulldoze('total', () => parseFloat(raw['People and Society']['Literacy']['total population'].text.split('%')[0]));
                    bulldoze('male', () => parseFloat(raw['People and Society']['Literacy'].male.text.split('%')[0]));
                    bulldoze('female', () => parseFloat(raw['People and Society']['Literacy'].female.text.split('%')[0]));
                    
                    bulldoze = constructBulldozer(country.child_labor);
                    bulldoze('total', () => parseInt(raw['People and Society']['Child labor - children ages 5-14']['total number'].text.split('.').join('')));
                    bulldoze('percentage', () => parseFloat(raw['People and Society']['Child labor - children ages 5-14'].percentage.text.split('%')));
                    
                    bulldoze = constructBulldozer(country.diplomatic_representation);
                    bulldoze('chief_of_mission', () => raw.Government['Diplomatic representation from the US']['chief of mission'].text);
                    bulldoze('embassy', () => raw.Government['Diplomatic representation from the US'].embassy.text);
                    bulldoze('mailing_address', () => raw.Government['Diplomatic representation from the US']['mailing address'].text);
                    bulldoze('telephone', () => raw.Government['Diplomatic representation from the US'].telephone.text);
                    bulldoze('fax', () => raw.Government['Diplomatic representation from the US']['FAX'].text);
                    
                    bulldoze = constructBulldozer(country.internet_users);
                    bulldoze('total', () => convertToNumber(raw.Communications['Internet users'].total.text));
                    bulldoze('percentage', () => parseFloat(raw.Communications['Internet users']['percent of population'].text.split('%')[0]));
                    
                    bulldoze = constructBulldozer(country.transnational_issues);
                    bulldoze('refugees', () => raw['Transnational Issues']['Refugees and internally displaced persons']['refugees (country of origin)'].text);
                    bulldoze('disputes', () => raw['Transnational Issues']['Disputes - international'].text);
                    bulldoze('drugs', () => raw['Transnational Issues']['Illicit drugs'].text);


                    country.save()
                        .then(
                            () => {
                                i++;
                                if(i === rawData.length) {
                                    db.close();
                                    done();
                                }
                            },
                            err => {
                                if(err.name !== 'ValidationError') console.log(err); // eslint-disable-line
                            }
                        );
                }); 
            });
        }
        catch(err) {
            console.log('ERROR: schematize failed'); // eslint-disable-line
            console.log(err);                        // eslint-disable-line
        }
    });


    return true;
};