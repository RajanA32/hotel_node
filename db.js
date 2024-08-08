const mongoose = require('mongoose')

// Define the Mongodb connection URL

const mongoURL = 'mongodb://localhost:27017/hotels'//Replace my database with your database name

// Set up MongoDB connection

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Get the default connection

// Mongoose maintaines a default connection object representing the MongoDB connection.
const db = mongoose.connection;

//Define event listeners for database connection

db.on('connected',()=>{
  console.log('Connected to MongoDB server');
})

db.on('error',(err)=>{
  console.log('error connection MongoDB ');
})

db.on('disconnected',()=>{
  console.log('disconnected MongoDB ');
})

//Export the database connection
module.exports = db;