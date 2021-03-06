const express = require('express');
const router = express.Router();
// ^^^ pull in express and express.router from the express model

const auth = require('../../middleware/auth');

// Bring in item Model to make queries 
const Item = require('../../models/item');

// route is GET /api/items, It gets all items, Public
router.get('/', (req, res) => {
  Item.find()
  .then(items => res.json(items))
})

// route is POST /api/items       Creates an item, if I was adding auth it would be Private..Its now private because of auth middleware
router.post('/', auth, (req, res) => {
  // construct a new item with Item Model
  const newItem = new Item({
    name: req.body.name,
    isCompleted: req.body.isCompleted
  });
  // save the new item to DB, the promise returns the item and we want it to come back as JSON
  newItem.save().then(item => res.json(item))
})

// route is PUT /api/items/:id     updates an item, if I was adding auth it would be Private..Its now private because of auth middleware

router.put('/:id', auth, (req, res) => {
  Item.findByIdAndUpdate(req.body._id, req.body)  // provide ID to find item and pass in new object in body
  .then( () => res.json({sucess: true}))
  .catch( err => console.log(err))
})

//.catch( err => res.status(404).json({success: false}))

// route is DELETE /api/items/:id, It gets all items, if I was adding auth it would be Private..Its now private because of auth middleware
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
 // with promise back to us..take item arrow func.remove item..promise is then callback..make the response an object
  .then(item => item.remove().then( () => res.json({success: true})))
  // if item not found... catch err..callback response status is 404 not found..return object false
  .catch(err => res.status(404).json({success: false}))
})


module.exports = router;