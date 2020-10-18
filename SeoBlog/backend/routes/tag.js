const express = require('express');
const router = express.Router();

//controllers
const { adminMiddleware, requireSignin } = require('../controllers/auth');
const { create, list, read, remove  } = require('../controllers/tag');




//validators 
const{runValidation} = require('../validators');//it automatically goes to index.js
const {createTagValidator} =require('../validators/tag'); //it checks errors 


router.post('/tag', createTagValidator, runValidation, requireSignin, adminMiddleware, create);// from controllers/auth
router.get('/tags', list);
router.get('/tag/:slug', read);
router.delete('/tag/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;