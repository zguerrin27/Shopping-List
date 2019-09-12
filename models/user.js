const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    required: true
  }
});


module.exports = User = mongoose.model('user', UserSchema);

