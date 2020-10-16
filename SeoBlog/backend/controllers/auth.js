//Creation of functionality for the auth route 
//Here is where we insert the functionality of 
//our website
const User = require('../models/user'); //The database for user 
const shortId = require('shortid'); //username
const jwt = require('jsonwebtoken');
const expressJwT = require('express-jwt');

exports.signup = (req, res)=>{
    //Find one method with mongoose 
    //we will get a user in the database
    //Find one email
    //The request body is given by us
    User.findOne({email: req.body.email}).
    //then we want to find the user, otherwise show an error 
        exec((err,user)=>{
        //1. if user exists then we should display an error saying 
        //the password is already taken
            if(user){
                return res.status(400).json({
                    error: 'Sorry, email is already taken'
                })
            }
        //take the values from the req. body 

        //OBJECT DISTRUCTION
            const {name, email, password} = req.body;
            let username = shortId.generate(); //for the moment we don't have a username
            let profile = `${process.env.CLIENT_URL}/profile/${username}`;//Creation of user profile page
        
            let newUser = new User({name, email, password, profile, username});

            newUser.save((err, success)=>{
                if(err){
                    return res.status(400).json({
                        error: err
                    })
                }
                //user: sucess shows the content of the User profile 
                /*
                res.json({
                    user: success
                })
                */
                
                res.json({
                    message: 'Signup success! Please signin'
                })
            })
        })



    //The values of req.body is a json body that
    //can be populated with any value after
    //adding middlewares
    //This code was for test
    /*
    const{name, email, password} = req.body;
    res.json({user: {name, email, password}});
    */
};

exports.signin = (req, res)=>{
    const {email, password} = req.body;
    // check if user exist
    //user is given from the database 
    //1. Find the email 
    User.findOne({email}).
    //2. Execute an errr if there is an error 
    //or user does not exists
        exec((err, user)=>{
            if(err||!user){
                return res.status(400).json({
                    error: 'User with that email does not exists, Please signup'
                })
            }
    //3. authenticate (from models): check if user password is correct
            if(!user.authenticate(password)){
                return res.status(400).json({
                    error: 'Email and password do not match.'
                })
            }
    //4. generate a token and send to client
            //take the id token from the user to protect routes
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
            //token is the name that we assign to the cookie
            //The cookie has the token 
            //They can store the user information and validate

            res.cookie('token', token, {expiresIn:'1d'});
    //5. destructure elements to send a response
            const {_id, username, name, email, role} =user; 
            return res.json({
                token, 
                user: {_id, username, name, email, role}
            });
        });

    
    //generate a token and send to client
    //it will have user id and secret
}; 

exports.signout = (req, res)=>{
    res.clearCookie("token"); 
    res.json({
        message:"Signout success"
    });
};

//it will take the tokens and compare it
//with the secret of the file

exports.requireSignin = expressJwT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: 'auth',
    requestProperty: 'auth'
  });
