const express = require('express');
const router = express.Router();
// ^^^ pull in express and express.router from the express model

// Bring in item Model to make queries 
const Item = require('../../models/item');

// route is GET /api/items, It gets all items, if I was adding auth it would be Public
router.get('/', (req, res) => {
  Item.find()
  .then(items => res.json(items))
})

// route is POST /api/items, Creates an item, if I was adding auth it would be Private
router.post('/', (req, res) => {
  // construct a new item with Item Model
  const newItem = new Item({
    name: req.body.name
  });

  // save the new item to DB, the promise returns the item and we want it to come back as JSON
  newItem.save().then(item => res.json(item))
})

// route is DELETE /api/items/:id, It gets all items, if I was adding auth it would be Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
 // with promise back to us..take item arrow func.remove item..promise is then callback..make the response an object
  .then(item => item.remove().then( () => res.json({success: true})))
  // if item not found... catch err..callback response status is 404 not found..return object false
  .catch(err => res.status(404).json({success: false}))
})


module.exports = router;