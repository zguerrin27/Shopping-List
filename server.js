const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const config = require('config');

const app = express();

// Body Parser Middleware needs this to view json 
app.use(bodyParser.json());

// Bring in mongo atlas and config DB... doing the ().mongoURI brings in just that module.
// const db = require('./config/keys').mongoURI;  // EDIT - removed this folder and added to JSON config file.

const db = config.get('mongoURI');

// Connect to Mongo...mongoose is promised based
mongoose
.connect(db, { 
  useNewUrlParser: true,
  useCreateIndex: true
 })
.then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err));

// Use Routes - anything that goes to /api/items...refer to the const items..which is the items file..made on line 5
app.use('/api/items', items)
app.use('/api/users', users)

// Serve static assets if in production - For Heroku

if(process.env.NODE_ENV === 'production'){    // if in production then
  app.use(express.static('client/build'));     // set static folder 

 // any request that we get that isnt a specified route api/items etc then get HTML in folder above..
 // This uses the Path module that we installed
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

// to run server configure a port...but also add the environment variable for heroku down the road.
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Started on ${port}`));

