const mongoose = require('mongoose');

const { Schema }  = mongoose;

const videoSchema = new Schema({

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },

  url: String,

  posterUrl: String,

  title: String,

  description: String,

  views: {
    type: Number,
    default: 0
  },

  likes: {
    type: Number,
    default: 0
  },

  dislikes: {
    type: Number,
    default: 0
  },

  createdOn: {
    type: Date,
    default: Date.now()
  }
  
});

module.exports = mongoose.model('video', videoSchema);