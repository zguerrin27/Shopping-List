const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/user');


// Route is POST /api/users, register new user, public 
router.post('/', (req,res) => {
  const { username, email, password } = req.body;     // destructuring to pull out those fields from request body

  //  validation
  if(!username || !email || !password){
    res.status(400).json({ msg: 'please enter all fields' })
  }

  // check for existing user by email field
  User.findOne({ email: email })
  .then(user => {
    if(user){
      return res.status(400).json({msg: 'User Already Exsists'});   
    }
    const newUser = new User({
      username,
      email,
      password
    });

    // Create salt and then hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save()
        .then(user => {

          jwt.sign(                 
            { id: user.id },               // pass id as payload 
            config.get('jwtSecret'),       //  get secret 
            { expiresIn: 3600 },           // expire 1 hour 
            (err, token) => {
              if(err) throw err;

              res.json({                   // with the response...send json with token and user 
                token: token,
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email
                }
              });

            }
          )  // end of jwt sign

        });  

      })
    })

  })

}) // end of sign up route


// Route is POST /api/users/auth, Authenticate user, public 

router.post('/auth', (req, res) => {

  const { email, password } = req.body;  // only grab those two because its what matter for auth 

   // validation
  if(!email || !password){
    res.status(400).json({ msg: 'please enter all fieldsssss' })
  }

  User.findOne({email: email})
  .then(user => {
    if(!user) return res.status(400).json({ msg: "No User Found" })

    // validate password 
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })

      jwt.sign(                 
        { id: user.id },           // pass id as payload   
        config.get('jwtSecret'),   //  get secret 
        { expiresIn: 3600 },       // expire 1 hour 
        (err, token) => {          
          if(err) throw err;

          res.json({               // generate response with token and user 
            token: token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email
            }
          });

        }
      )  // end of jwt sign

    })

  })

}); // end of auth route


// Route is GET /api/users/auth/user. Get user data from server with token / x-auth-token header
router.get('/auth/user', auth, (req, res) =>  {
  User.findById(req.user.id)
  .select('-password')   // this disregards the password and doesnt return it 
  .then(user => res.json(user));
});


module.exports = router;