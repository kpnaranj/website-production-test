//This is the second route, only the direction of the API
const express = require('express');
const router = express.Router();
//to export set variables we use the {} functionality
const {requireSignin, authMiddleware, adminMiddleware} = require("../controllers/auth");
const {read} = require("../controllers/user");


router.get('/profile', requireSignin, adminMiddleware, read);// from controllers/auth

module.exports = router;