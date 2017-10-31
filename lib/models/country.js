const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const RequiredString = { 
    type: String,
    required : true
};

const schema = new Schema({
    name: RequiredString,
    capital: RequiredString,
    population: Number,
    population_distribution: String,
    coordinates: String,
    area_comparative: String,
    climate: String,
    ethnic_groups: String,
    languages: [{type:String}],
    religions: [{type:String}],
    mothers_age_first_birth: Number,
    life_expectancy: Number,
    contraceptive_prevalence_rate: Number,
    physicians_density: Number,
    literacy: {
        total: Number,
        male: Number,
        female: Number
    },
    child_labor: {
        total: Number,
        percentage: Number
    },
    time_difference: String,
    diplomatic_representation: {
        chief_of_mission: String,
        embassy: String,
        mailing_address: String,
        telephone: String,
        fax: String
    },
    exchange_rate: String,
    internet_users: {
        total: Number,
        percentage : Number
    },
    transnational_issues: {
        refugees: String,
        disputes: String,
        drugs: String
    }
});

module.exports = mongoose.model('Country', schema);