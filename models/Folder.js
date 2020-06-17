const { model, Schema } = require('mongoose');

const folderSchema = new Schema({
  name: String,
  createdAt: String,
});

module.exports = model('Folder', folderSchema);