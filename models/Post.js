const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  body: String,
  username: String,
  name: String,
  picture: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      name: String,
      picture: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      name: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Post', postSchema);