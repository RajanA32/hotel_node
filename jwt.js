const jwt = require('jsonwebtoken');

const jwtAuthMiddlware = (req, res, next)=>{

  //Extract the jwt token from the request headers
  const token = req.headers.authorization.split(' ')[1];
  if(!token) return res.status(401).json({error : 'Unauthorized'});

  try{
     //Verify the jwt token 
     const decoded = jwt.verify(token, process.env.JWT_SECRET);

     //Attach user information to the request object
     req.user = decoded
     next();
  }
  catch(err){
    console.log(err);
    res.status(401).json({error: "Invalid token"});
  }
}

//Function to genrate JWT token
const genrateToken = (userData) =>{
  //Genrate a new JWT token using user data
  return jwt.sign(userData, process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddlware,genrateToken};