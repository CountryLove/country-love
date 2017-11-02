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