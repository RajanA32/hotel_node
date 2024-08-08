const express = require('express')
const app = express();
 const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const Person = require('./models/person');
const MenuItem = require('./models/MenuItem');


app.get('/',function(req, res){
  res.send('Hello World I am Rajan Agrahari')
})
// Import the routes file

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//Use the routes

app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

app.listen(3030,()=>{
  console.log('listening on port 3030');
})