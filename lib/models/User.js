const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const reqString = {
    type: String, 
    required: true
};

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    hash: Object.assign({
        default: 'has not yet generated'
    }, reqString),
    email: Object.assign({
        validate: {
            validator: input =>/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input),    // eslint-disable-line
            
        }
    })


})