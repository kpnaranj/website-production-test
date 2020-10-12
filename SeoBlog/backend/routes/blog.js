//1. Create a new folder for routes
//ALL THE ROUTERS WE WILL CREATE WILL BE 
//DELIVERED HERE
const express = require('express');
const router = express.Router();

//2. then get a request for the routes of the api

router.get('/', (req, res)=>{
    res.json({time:Date().toString()});
});

module.exports = router;