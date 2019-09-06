const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ^^ pull in mongoose orm and init a variable to hold a schema that we can make new schemas with

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

// this exports the model as "Item"...mongoose.model creates a model by taking in the name 'item', and the schema;
module.exports = Item = mongoose.model('item', ItemSchema);