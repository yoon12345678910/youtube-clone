const mongoose = require('mongoose');

const { Schema }  = mongoose;

const videoSchema = new Schema({

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

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },

  comments: {
    type: [Schema.Types.ObjectId],
    ref: 'comment'
  },

  createdOn: {
    type: Date,
    default: new Date()
  }
  
});

module.exports = mongoose.model('video', videoSchema);