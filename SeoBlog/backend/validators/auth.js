//Validators will check for errors or if some
//conditions are met, for example
//6 characters in password

//1. Import validators from express
const {check} = require('express-validator');

//2. Export the type of validator we want 
exports.userSignupValidator = [
    check('name').
        not().
        isEmpty().
        withMessage('Name is required'),
    check('email').
        isEmail().
        withMessage('Must be a valid email adress'),
    check('password').
        isLength({min:6}).
        withMessage('Password must be at least six characters long')
];

//When it runs, this will be sent as error, how do we send error
//In the index

// we will have a few, so we dont need to rewrite again