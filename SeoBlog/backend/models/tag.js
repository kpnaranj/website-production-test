const mongoose = require('mongoose');
//3. Create a user schema 
const tagSchema = new mongoose.Schema({
    //Schema is simple, it takes all the required 
    //info that the website needs to run 
    name: {
        type: String,
        trim: true, 
        required: true,
        maxlength:32,
    }, 

    slug: {
        type: String,
        unique: true,
        index: true,
    },
    
}, {timestamp:true});

module.exports = mongoose.model('Tag', tagSchema);

