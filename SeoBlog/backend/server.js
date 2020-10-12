//1. Set up dependencies 
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

//2. Run App 
const app = express();

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


//5. Bring routes that will be called by frontend
app.get('/api', (req, res)=>{
    res.json({time:Date().toString()});
})

//6. Bring and listen the port 
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`The server is running at port: ${port}`)
});


