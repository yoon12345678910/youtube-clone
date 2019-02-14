const mongoose = require('mongoose');

const { Schema }  = mongoose;

const videoSchema = new Schema({
    title: String,
    owner: Schema.Types.ObjectId,
    url: String,
    desciption: String,
    poster: String,
    createdOn: {
      type: Date,
      default: Date.now()
    }
});

module.exports = mongoose.model('video', videoSchema);