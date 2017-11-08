const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const reqString = {
    type: String, 
    required: true
};
// Use of Object.assign makes it hard to see what's going on and
// ends up same number of lines.
// Object spread operator better choice, but I don't think it is yet in node v8
const userSchema = new Schema({
    name: reqString,
    hash: Object.assign({
        default: 'has not yet generated'
    }, reqString),
    email: Object.assign({
        validate: {
            validator: input =>/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input),    // eslint-disable-line
            message: 'invalid email address'
        }
    }, reqString),
    homebase: String
});

userSchema.methods.generateHash = function(password) {
    this.hash = bcrypt.hashSync(password, 10);
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash);
};

userSchema.statics.emailExists = function(email){
    return this.find({email})
        .count()
        .then(count => {
            return count > 0;
        });
};

module.exports = mongoose.model('User', userSchema);
