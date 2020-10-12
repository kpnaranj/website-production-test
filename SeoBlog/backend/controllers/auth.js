//Creation of functionality for the auth route 
exports.signup = (req, res)=>{
    //The values of req.body is a json body that
    //can be populated with any value after
    //adding middlewares
    const{name, email, password} = req.body;
    res.json({user: {name, email, password}});
};
