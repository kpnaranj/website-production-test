//This is the second route, only the direction of the API
const express = require('express');
const router = express.Router();
//to export set variables we use the {} functionality
const {signup} = require("../controllers/auth");

//2. then get a request for the routes of the api
//3. The response of the router could be complex
//so better send it to another folder
//post receives data 
router.post('/signup', signup);//from controllers/signup

module.exports = router;