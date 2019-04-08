const mongoose = require('mongoose');

const { Schema }  = mongoose;

const commentSchema = new Schema({

  text: String,
    
  reply: Boolean,
  
  likes: {
    type: Number,
    default: 0
  },
  
  dislikes: {
    type: Number,
    default: 0
  },
  
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  
  postedAbout: {
    type: Schema.Types.ObjectId,
    ref: 'video'
  },

  subComments: {
    type: [Schema.Types.ObjectId],
    ref: 'comment'
  },
  
  createdOn: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('comment', commentSchema);