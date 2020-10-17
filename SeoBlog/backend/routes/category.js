
const express = require('express');
const { adminMiddleware, requireSignin } = require('../controllers/auth');
const { create } = require('../controllers/category');
const router = express.Router();

//const {} = require("../controllers/auth");


//validators 
const{runValidation} = require('../validators');//it automatically goes to index.js
const {categoryCreateValidator} =require('../validators/category'); //it checks errors 


router.post('/category', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create);// from controllers/auth

module.exports = router;