const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

// Body Parser Middleware needs this to view json 
app.use(bodyParser.json());

// Bring in mongo atlas and config DB... doing the ().mongoURI brings in just that module.
const db = require('./config/keys').mongoURI;

// Connect to Mongo...mongoose is promised based
mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err));

// Use Routes - anything that goes to /api/items...refer to the const items..which is the items file..made on line 5
app.use('/api/items', items)

// to run server configure a port...but also add the environment variable for heroku down the road.
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Started on ${port}`));