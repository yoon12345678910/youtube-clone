const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({

  googleId: {
    type: String,
    unique: true
  },

  username: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  jwt: String,

  imageUrl: String,
  
  links: [String],

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

  createdOn: {
    type: Date,
    default: new Date()
  }
    
});

module.exports = mongoose.model('user', userSchema);