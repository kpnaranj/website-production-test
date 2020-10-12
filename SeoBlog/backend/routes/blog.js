//1. Create a new folder for routes
//ALL THE ROUTERS WE WILL CREATE WILL BE 
//DELIVERED HERE
const express = require('express');
const router = express.Router();
//to export set variables we use the {} functionality
const {time} = require("../controllers/blog");

//2. then get a request for the routes of the api
//3. The response of the router could be complex
//so better send it to another folder

router.get('/', time);//from controllers/blog

module.exports = router;