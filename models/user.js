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
    imageUrl: String,
    videos: [String],
    createOn: {
      type: Date,
      default: Date.now()
    }
});

module.exports = mongoose.model('user', userSchema);