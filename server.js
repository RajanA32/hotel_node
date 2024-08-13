const express = require('express')
const app = express();
 const db = require('./db');
 require('dotenv').config();
 const passport = require('./auth');
 
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3030;

//Middleware Function
const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}]Request Made To:${req.originalUrl}`);
  next(); //Move on the next phase
}


// const MenuItem = require('./models/MenuItem');

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/',function(req, res){
  res.send('Hello World I am Rajan Agrahari')
})
// Import the routes file

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//Use the routes

app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);


app.listen(PORT,()=>{
  console.log('listening on port 3030');
})