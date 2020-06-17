const { model, Schema } = require('mongoose');

const photoSchema = new Schema({
  image: String,
  createdAt: String,
  folder: [
    {
      id: String,
      name: String,
      createdAt: String
    }
  ]
});

module.exports = model('Photo', photoSchema);