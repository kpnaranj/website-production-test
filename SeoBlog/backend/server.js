//1. Set up dependencies 
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
//8. Bring external exports from other files
const blogRoutes = require('./routes/blog');

//2. Run App 
const app = express();

//7. Bring database that will be used for the project
//Either Atlas or local host
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true, 
    useCreateIndex:true , 
    useUnifiedTopology: true, 
    useFindAndModify:false
})
.then(()=>{console.log('DB is connected')});

//3. Apply middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//4. Apply cors - when we make a request to frontend
//we will get an error because we have two servers
//we need to set up cors - Only to browser to browser

if(process.env.NODE_ENV === 'development'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}

//9. routes middlewares replaced by 5
//When used as a middleware then the port use the app
//The blogRoutes are in other file where it is used as GET

app.use('/api',blogRoutes);//coming from routes

//5. Bring routes that will be called by frontend
/*app.get('/api', (req, res)=>{
    res.json({time:Date().toString()});
})*/

//6. Bring and listen the port 
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`The server is running at port: ${port}`)
});


