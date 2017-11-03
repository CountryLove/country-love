/* eslint-disable */

// number of experiences per country
db.getCollection('experiences').aggregate([
    {
        $group: {
            _id: { country: "$country" },
            count: { $sum: 1 }
        }
    }
]);

// get just the countries through experiences
db.getCollection('experiences').aggregate([
    {
        $group: {
            _id: { country: "$country" }
        }
    },
    {
        $lookup: {
            from: "countries",
            localField: "_id.country",
            foreignField: "_id",
            as: "country"
        }
    },
    {
        $project: { _id: false }
    },
    {
        $unwind: "$country"
    }
]);

// gets countries and their average ratings
db.getCollection('experiences').aggregate([
    {
        $project: {
            _id: false,
            country: true,
            rating: true
        }
    },
    {
        $lookup: {
            from: "countries",
            localField: "country",
            foreignField: "_id",
            as: "country"
        }
    },
    {
        $group: {
            _id: "$country.name",
            avg_rating: { $avg: "$rating" }
        }
    },
    {
        $unwind: "$_id"
    }
]);

// DONE: gets countries with average ratings and number of experiences
db.getCollection('experiences').aggregate([
    {
        $project: {
            _id: false,
            country: true,
            rating: true
        }
    },
    {
        $lookup: {
            from: "countries",
            localField: "country",
            foreignField: "_id",
            as: "country"
        }
    },
    {
        $group: {
            _id: "$country.name",
            avg_rating: { $avg: "$rating" },
            num_experiences: { $sum: 1 }
        }
    },
    {
        $unwind: "$_id"
    }
]);

// gets each country by name and an array of all travelers who have visited
db.getCollection('experiences').aggregate([
    {
        $lookup: {
            from: "countries",
            localField: "country",
            foreignField: "_id",
            as: "country"
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user"
        }
    },
    {
        $project: {
            country: true,
            user: true,
            _id: false
        }
    },
    {
        $group: {
            _id: "$country.name",
            travelers: { $push: "$user.name" }
        }
    },
    {
        $unwind: "$_id"
    }
]);

// gets all spanish speaking countries and sorts them by ranking
db.getCollection('experiences').aggregate([
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
            country: true,
            _id: false
        }
    },
    {
        $match: {
            'country.languages': 'Spanish'
        }
    },
    {
        $group: {
            _id: '$country.name',
            rating: { $avg: '$rating' }
        }
    },
    {
        $sort: {
            rating: -1
        }
    },
]);

// DONE: gets the diff between gender literacy rate
db.getCollection('countries').aggregate(
    {
        $project: {
            _id: false,
            "name": 1,
            "literacy": 1,
            "literacyGap": {
                $subtract: [
                    "$literacy.male",
                    "$literacy.female"
                ]
            }
        }
    },
    {
        $sort: { "literacyGap": 1 }
    },
    {
        $match: {
            "literacyGap": { $ne: null }
        }
    }
);


// DONE: gets highest levels of child labor
db.getCollection('countries').aggregate([{

    $project: {
        _id: false,
        "name": 1,
        "child_labor.percentage": 1,

    }

},
{
    $sort: { "child_labor.percentage": 1 }
},
{
    $match: {
        "child_labor.percentage": { $ne: null }
    }
}

])


// DONE: by percentage of internet users
db.getCollection('countries').aggregate([
    {
        $match: {
            "internet_users.percentage": {
                $lt: 20,
                $ne: null
            }
        }
    },

    {
        $sort: { "internet_users.percentage": 1 }
    },

    {
        $project: {
            _id: false,
            name: 1,
            "percentage of internet users": "$internet_users.percentage"

        }

    }
]);

// gets all languages paired with an array of which countries speak the// languages are sorted by number of countries they are spoken i// countries per language are sorted by user rating
db.getCollection('experiences').aggregate([
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
    }
]);// {
//     $match : { 'language' : ${queryInput} }
// }
// user's list of countries sorted by trip date
db.getCollection('experiences').aggregate([
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
]); 

    // {
    //     $match : { 'user' : ${queryInput} }
    // }
// top rated by lifeExpectancy
aggregate([
    
     {
         $lookup : {
             from : "countries",
             localField : "country",
             foreignField : "_id",
             as : "country"
         }
     },
     {
         $group : {
             _id : { country: "$country.name",
                     "Life Expectancy": "$country.life_expectancy"},
             avg_rating : { $avg : "$rating" }
         }
     },
     
    {
         $sort: { avg_rating: -1}
     },
     {
         $project: { 
             _id: true,
             "country.name": 1,
             "Life Expectancy": 1
             }
      }
 ]);


// find all countries with given tag sorted by count
db.getCollection('experiences').aggregate([
    {
        $lookup : {
            from : 'countries',
            localField : 'country',
            foreignField : '_id',
            as : 'country'
        }
    },
    {
        $unwind : '$tags'
    },
    {
        $group : {
            _id : {
                tag : '$tags',
                country : '$country.name'
            },
            count : {
                $sum : 1
            }
        }
    },
    {
        $sort : {
            'count' : -1
        }
    },
    {
        $group : {
            _id : '$_id.tag',
            total_count : {
                $sum : '$count'
            },
            countries : {
                $push : {
                    name : '$_id.country',
                    count : '$count'
                },
            },
            
        }
    },
    {
        $sort : {
            'total_count' : -1
        }
    },
    {
        $project : {
            _id : false,
            tag : '$_id',
            total_count : true,
            countries : true
        }
    },
    {
        $match : {
            'tag' : 'food'
        }
    }
]);

// gets all tags (and their counts) associated with a country
db.getCollection('experiences').aggregate([
    {
        $lookup : {
            from : 'countries',
            localField : 'country',
            foreignField : '_id',
            as : 'country'
        }
    },
    {
        $unwind : '$tags'
    },
    {
        $group : {
            _id : {
                tag : '$tags',
                country : '$country.name'
            },
            count : {
                $sum : 1
            }
        }
    },
    {
        $group : {
            _id : '$_id.country',
            tags : {
                $push : {
                    tag: '$_id.tag',
                    count: '$count'
                }
            },
            total_count : {
                $sum : '$count'
            }
        }
    },
    {
        $project : {
            _id : false,
            country : '$_id',
            tags : true,
            total_count : true
        }
    },
    {
        $unwind : '$country'
    }
    ]);