//1. For Schemas we are using mongoose
//2. Set up the dependencies for schemas
//Crypto is used to hash the password 
const mongoose = require('mongoose');
const crypto = require('crypto');
const { timeStamp } = require('console');
const { throws } = require('assert');
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
        default: 0,
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

//We can add methods and virtual fields
//For example: a password 
//But not the real, but a hash password
//These are functions for the schemas
userSchema.virtual('password').
//make sure you use functions instead of arrows
    set(function(password){
        // Create a temporary variable called _password
        this._password = password;
        //Then we will generate a salt, which will be used in the Hash
        this.salt = this.makeSalt();
        // Finally we will encrypt the password, 
        // This will be in the database 
        this.hashed_password = this.encryptPassword(password);
    }).
    get(function(){
        return this._password;
    });

//Here we create the methods makeSalt and encryptPassword
//We create the functions and separate it with a comma
userSchema.methods = {
    //it is to log in to the user
    authenticate:function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    //When we will compare we will get either true or false
    //If it is true you can log in 

    encryptPassword: function(password){
        //if there is no password return nothing
        if(!password) return ''
        try{
            return crypto.
            createHmac('sha1', this.salt).
            update(password).
            digest('hex');
        }catch(err){
            //the error catch will send nothing
            return '';
        }

    }, 

    makeSalt: function(){
        return Math.round(new Date().valueOf()*Math.random()) + '';
    }
}

module.exports = mongoose.model('User', userSchema);
