const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: {
      type: String,
      unique: true
    },
    username: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    password: String,
    jwt: String,
    imageUrl: String,
    videos: {
      type: [Schema.Types.ObjectId],
      ref: 'video'
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: 'video'
    },
    dislikes: {
      type: [Schema.Types.ObjectId],
      ref: 'video'
    },
    subscriptions: {
      type: [Schema.Types.ObjectId],
      ref: 'user'
    },
    createOn: {
      type: Date,
      default: Date.now()
    }
});

module.exports = mongoose.model('user', userSchema);