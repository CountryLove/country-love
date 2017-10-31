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
        type: String,
        required: true
    },
    tags: [String],
    city: String
},
{timestamps: true});


module.exports = mongoose.model('Experience', schema);