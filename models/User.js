const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  about: String,
  relation: String,
  city: String,
  state: String,
  picture: String,
  createdAt: String
});

module.exports = model('User', userSchema);


