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
    languages: {
        official: [{
            _id: false,
            language: String,
            percentage: Number
        }],
        all: [{
            _id: false,
            language: String,
            percentage: Number
        }]
    },
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

schema.statics.literacyGap = function() {
    return this.aggregate([
        {
            $project: {
                _id: false,
                'name':1,
                'literacy':1,
                'literacyGap': {
                    $subtract: [
                        '$literacy.male',
                        '$literacy.female'
                    ]
                }
            }
        },
        {
            $sort: { 'literacyGap': 1 }
        },
        {
            $match: {
                'literacyGap': { $ne: null } 
            } 
        }
    ]);
};


schema.statics.childLabor = function () {
    return this.aggregate([
        {
        
            $project: {
                _id: false,
                'name':1,
                'child_labor.percentage':1,
                
            }
        
        },
        {
            $sort: { 'child_labor.percentage': -1 }
        },
        {
            $match: {
                'child_labor.percentage': { $ne: null } 
            } 
        }
        
    ]);
};


schema.statics.internetUsers = function() {
    return this.aggregate([
        {
            $match: {
                'internet_users.percentage': {
                    $ne: null
                }
            }
        },
        {
            $sort: { 'internet_users.percentage': 1 }
        },
        {
            $project: {
                _id: false,
                name: 1,
                'percentage of internet users': '$internet_users.percentage'
            }
        }
    ]);
};


schema.statics.lifeExpectancy = function () {
    return this.aggregate([
        {
            $match: {
                'mothers_age_first_birth': { $ne: null },
                'life_expectancy' : { $ne: null }
            }
        },
        {
            $sort: {
                'mothers_age_first_birth': 1
            } 
        },
        {
            $project: {
                _id: false,
                'country': '$name',
                'mothers_age_first_birth': true,
                'life_expectancy': true
            }
        }
    ]);
};


module.exports = mongoose.model('Country', schema);