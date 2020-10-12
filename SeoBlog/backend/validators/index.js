//Import auth.js with user validator 
//this validation result shows errors from check 
// The first one checks the errors
//The second one displays the errors
const {validationResult} = require('express-validator');

//this is a middleware for our server.js
exports.runValidation = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({error: errors.array()[0].msg});
    }
    next();
}

//This middleware will go to routes