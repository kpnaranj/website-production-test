//1. For Schemas we are using mongoose
//2. Set up the dependencies for schemas
//Crypto is used to hash the password 
const mongoose = require('mongoose');
const crypto = require('crypto');
const { timeStamp } = require('console');
//3. Create a user schema 
const userSchema = new mongoose.Schema({
    //Schema is simple, it takes all the required 
    //info that the website needs to run 
    username: {
        type: String,
        trim: true, 
        required: true,
        max:32,
        unique:true, 
        index: true, 
        lowercase: true, 
    }, 

    name: {
        type: String,
        trim: true, 
        required: true,
        max:32,
    },

    email: {
        type: String,
        trim: true, 
        required: true,
        unique:true,
        lowercase: true, 
    },

    profile: {
        type: String,
        required: true,
    },

    hashed_password: {
        type: String,
        required: true,
    },

    salt: String,

    about:{
        type: String,
    },

    role:{
        type: Number, 
        trim: true
    }, 

    photo:{
        data:Buffer, 
        contentType: String,
    },

    resetPasswordLink:{
        data: String, 
        default: '',
    }
    
}, {timestamp:true});

module.exports = mongoose.model('User', userSchema);
