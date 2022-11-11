const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // Makes sure that the email address is unique

const userSchema = mongoose.Schema({
    email:      { type: String,     required: true, unique: true },
    firstName:  { type: String,     required: false },
    lastName:   { type: String,     required: false },
    password:   { type: String,     required: true },
    phone:      { type: String,     required: false },
    address:    { type: String,     required: false },
    zipcode:    { type: String,     required: false },
    city:       { type: String,     required: false },
    birthday:   { type: Date,       required: false },
    avatar:     { type: String,     required: false },
    isAdmin:    { type: Boolean,    required: false }  
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);