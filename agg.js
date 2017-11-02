/* eslint-disable */


// number of experiences per country
db.getCollection('experiences').aggregate([
    {
        $group: {
            _id: { country : "$country" },
            count : { $sum : 1 }
        }
    }
]);



// get just the countries through experiences
db.getCollection('experiences').aggregate([
    {
        $group : {
            _id : { country : "$country" }
        }
    },
    {
        $lookup : {
            from : "countries",
            localField : "_id.country",
            foreignField : "_id",
            as: "country"
        }
    },
    {
        $project : { _id : false }
    },
    {
        $unwind : "$country"
    }
]);



// gets countries and their average ratings
db.getCollection('experiences').aggregate([
    {
        $project : { 
            _id: false,
            country : true,
            rating : true 
        }
    },
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
            _id : "$country.name",
            avg_rating : { $avg : "$rating" }
        }
    },
    {
        $unwind : "$_id"
    }
]);



// gets countries with average ratings and number of experiences
db.getCollection('experiences').aggregate([
    {
        $project : { 
            _id: false,
            country : true,
            rating : true 
        }
    },
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
            _id : "$country.name",
            avg_rating : { $avg : "$rating" },
            num_experiences : { $sum : 1 }
        }
    },
    {
        $unwind : "$_id"
    }
]);



// gets each country by name and an array of all travelers who have visited
db.getCollection('experiences').aggregate([
    {
        $lookup : {
            from : "countries",
            localField : "country",
            foreignField : "_id",
            as : "country"
        }
    },
    {
        $lookup : {
            from : "users",
            localField : "user",
            foreignField : "_id",
            as : "user"
        }
    },
    {
        $project : {
            country : true,
            user : true,
            _id : false
        }
    },
    {
        $group : {
            _id : "$country.name",
            travelers : { $push : "$user.name" }
        }
    },
    {
        $unwind : "$_id"
    }
]);



// gets all spanish speaking countries and sorts them by ranking
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
        $lookup : {
            from : 'users',
            localField : 'user',
            foreignField : '_id',
            as : 'user'
        }
    },
    {
        
        $project : {
            rating : true,
            country : true,
            _id : false
        }
    },
    {
        $match : {
            'country.languages' : 'Spanish'
        }
    },
    {
        $group : {
            _id : '$country.name',
            rating : { $avg : '$rating' }
        }
    },
    {
        $sort : {
            rating : -1
        }
    },
]);

// gets the diff between gender literacy rates

db.getCollection('countries').aggregate(
    {
        $project: {
            _id: false,
            "name":1,
            "literacy":1,
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

    //gets highest levels of child labor
    db.getCollection('countries').aggregate([{
        
               $project: {
                _id: false,
                "name":1,
                "child_labor.percentage":1,
                
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