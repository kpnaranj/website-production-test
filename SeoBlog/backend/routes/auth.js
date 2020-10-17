//This is the second route, only the direction of the API
const express = require('express');
const { cookie } = require('express-validator');
const router = express.Router();
//to export set variables we use the {} functionality
const {signup, signin, signout, requireSignin} = require("../controllers/auth");
const user = require('../models/user');

//validators 

const{runValidation} = require('../validators');//it automatically goes to index.js
const {userSignupValidator, userSigninValidator} =require('../validators/auth'); //it checks errors 

//2. then get a request for the routes of the api
//3. The response of the router could be complex
//so better send it to another folder
//post receives data 
//the post says this
//1. Go to signup
//2. Check if there is any error 
//3. Send errors if there are errors 
//4. Run the API from controllers
router.post('/signup',userSignupValidator, runValidation, signup);//from controllers/auth - signin
router.post('/signin',userSigninValidator, runValidation, signin);//from controllers/auth -signup
router.get('/signout', signout);// from controllers/auth
//test

/*
router.get('/secret', requireSignin, (req, res)=>{

    res.json({user: req.auth})
})
*/

module.exports = router;