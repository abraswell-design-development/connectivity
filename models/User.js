const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  about: String,
  city: String,
  state: String,
  picture: String,
  token: String,
  createdAt: String
});

module.exports = model('User', userSchema);


