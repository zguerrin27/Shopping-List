const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {

  const token = req.header('x-auth-token');  //  grab token from request header

  // Check token -  401 status is user is unauthorized 
  if(!token) {
    return res.status(401).json({ msg: "No Token, authorization denied" });
  }

  try {
    // Verify token 
    const decoded = jwt.verify(token, config.get('jwtSecret'));  
    // Add user from payload from front end 
    req.user = decoded;
    next();
  } catch (e){
    res.status(400).json({ msg: "Token is not valid" })
  }
}

module.exports = auth;