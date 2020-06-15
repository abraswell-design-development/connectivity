const { model, Schema } = require('mongoose');

const photoSchema = new Schema({
    caption: String,
    subcaption: String,
    image: String,
    // thumbnail: String,
    folder: String,
    createdAt: String
});



module.exports = model('Photo', photoSchema);