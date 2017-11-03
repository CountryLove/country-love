const mongoose  = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    country: {
        type: Schema.Types.ObjectId,
        ref : 'Country',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    comment: String,
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    tags: [String],
    city: String
},
{timestamps: true});





schema.statics.countriesByLang = function(userLang) {

    const aggregator = [
        {
            $lookup: {
                from: 'countries',
                localField: 'country',
                foreignField: '_id',
                as: 'country'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
    
            $project: {
                rating: true,
                country: '$country.name',
                languages: '$country.languages.all',
                _id: false
            }
        },
        {
            $project: { 'languages.percentage': false }
        },
        {
            $unwind: '$languages'
        },
        {
    
            $unwind: '$languages'
        },
        {
            $project: {
                rating: true,
                country: true,
                language: '$languages.language'
            }
        },
        {
            $unwind: '$country'
        },
        {
            $group: {
                _id: { country: '$country', language: '$language' },
                avg_rating: { $avg: '$rating' }
            }
        },
        {
            $sort: { avg_rating: -1 }
        },
        {
            $group: {
                _id: { language: '$_id.language' },
                countries: {
                    $push: {
                        country: '$_id.country',
                        avg_rating: '$avg_rating'
                    }
                }
            }
        },
        {
            $project: {
                _id: false,
                language: '$_id.language',
                countries: '$countries',
                num: { $size: '$countries' }
            }
        },
        {
            $sort: { num: -1 }
        },
        {
            $match:  { 'language': userLang }
        }
    ];

    if(!userLang) aggregator.pop();
    return this.aggregate(aggregator);
};

schema.statics.userCountryLog = function(username) {

    const aggregator = [
        {
            $lookup: {
                from: 'countries',
                localField: 'country',
                foreignField: '_id',
                as: 'country'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $unwind: '$country'
        },
        {
            $sort: { 'createdAt': -1 }
        },
        {
            $group: {
                _id: '$user.name',
                countries: {
                    $push: {
                        country: '$country.name',
                        city: '$city',
                        date: '$createdAt'
                    }
                }
            }
        },
        {
            $project: {
                _id: false,
                user: '$_id',
                count: { $size: '$countries' },
                countries: true
            }
        }
    ];
    const matcher = {
        $match : { 'user' : username }
    };
    if(username) aggregator.push(matcher);
    return this.aggregate(aggregator);
};

schema.statics.userExperienceLog = function(username) {
    
    const aggregator = [
        {
            $lookup: {
                from: 'countries',
                localField: 'country',
                foreignField: '_id',
                as: 'country'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $unwind: '$country'
        },
        {
            $sort: { 'createdAt': -1 }
        },
        {
            $group: {
                _id: '$user.name',
                countries: {
                    $push: {
                        country: '$country.name',
                        city: '$city',
                        rating: '$rating',
                        comment: '$comment',
                        tags: '$tags',
                        date: '$createdAt'
                    }
                }
            }
        },
        {
            $project: {
                _id: false,
                user: '$_id',
                count: { $size: '$countries' },
                countries: true
            }
        }
    ];
    const matcher = {
        $match : { 'user' : username }
    };
    if(username) aggregator.push(matcher);
    return this.aggregate(aggregator);
};


schema.statics.userExpLogByEmail = function(email) {
    
    const aggregator = [
        {
            $lookup: {
                from: 'countries',
                localField: 'country',
                foreignField: '_id',
                as: 'country'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $unwind: '$country'
        },
        {
            $sort: { 'createdAt': -1 }
        },
        {
            $group: {
                _id: {
                    name: '$user.name',
                    email: '$user.email'
                },
                countries: {
                    $push: {
                        country: '$country.name',
                        city: '$city',
                        rating: '$rating',
                        comment: '$comment',
                        tags: '$tags',
                        date: '$createdAt'
                    }
                }
            }
        },
        {
            $match: {
            }
        },
        {
            $project: {
                _id: false,
                user: '$_id.name',
                count: { $size: '$countries' },
                countries: true
            }
        }
    ];
    const matcher = { '_id.email' : email };
    if(email) aggregator[6].$match = matcher;
    return this.aggregate(aggregator);
};

schema.statics.sample = function(quantity) {

    const aggregator = [
        {
            $project : {
                experience : {
                    _id : '$_id',
                    updatedAt : '$updatedAt',
                    createdAt : '$createdAt',
                    country : '$country',
                    user : '$user',
                    comment : '$comment',
                    rating : '$rating',
                    city : '$city',
                    tags : '$tags',
                    
                }
            }  
        },
        {
            $lookup : {
                from : 'users',
                localField : 'experience.user',
                foreignField : '_id',
                as : 'user'
            }
        },
        {
            $unwind : '$user'
        },
        {
            $lookup : {
                from : 'countries',
                localField : 'experience.country',
                foreignField : '_id',
                as : 'country'
            }
        },
        {
            $unwind : '$country'
        },
        {
            $project : {
                _id : false,
                experience : true,
                user : true,
                country : true
            }
        },
        {
            $sample : {
                size : parseInt(quantity) || 3
            }
        }
    ];
    return this.aggregate(aggregator);
};

schema.statics.avgRating = function () {
    return this.aggregate([
        {
            $project : { 
                _id: false,
                country : true,
                rating : true 
            }
        },
        {
            $lookup : {
                from : 'countries',
                localField : 'country',
                foreignField : '_id',
                as : 'country'
            }
        },
        {
            $group : {
                _id : '$country.name',
                avg_rating : { $avg : '$rating' },
                num_experiences : { $sum : 1 }
            }
        },
        {
            $unwind : '$_id'
        },
        {
            $sort : { avg_rating: 1 }
        }

    ]);
};


module.exports = mongoose.model('Experience', schema);