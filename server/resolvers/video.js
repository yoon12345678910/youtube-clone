const aws = require('aws-sdk');

module.exports = {
  Query: {
    
    allVideos: async (_, __, { models }) => await models.Video.find({}).sort({ 'createdOn': -1 }),

    getVideoById: async (_, { videoId }, { models }) => {
      return await models.Video.findById(videoId)
        .populate([
          { path: 'owner', model: 'user' },
          {
            path: 'comments',
            model: 'comment',
            populate: [
              { path: 'postedBy', model: 'user' },
              {
                path: 'subComments',
                model: 'comment',
                populate: { path: 'postedBy', model: 'user' }
              }
            ], options: { sort: { 'createdOn': -1 } }
          }
        ])
        .exec()
    }
  
  },
  Mutation: {

    s3SignVideo: async (_, { filename, filetype }, __) => {
      const s3 = new aws.S3({
        signatureVersion: 'v4',
        region: 'ap-northeast-2'
      });
      const s3Bucket = 'ytc-tutorial';
      const s3Params = {
        Bucket: s3Bucket,
        Key: filename,
        Expires: 60,
        ContentType: filetype,
        ACL: 'public-read'
      };
      const requestUrl = await s3.getSignedUrl('putObject', s3Params);
      const s3BucketUrl = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;
      return { requestUrl, s3BucketUrl };
    },

    createVideo: async (_, { input }, { models, user: { id } }) => {
      const { title, description, url, posterUrl } = input;
      const video = new models.Video({
        owner: id,
        title,
        description,
        posterUrl,
        url,
        createdOn: new Date()
      });
      const savedVideo = await video.save();
      const filter = { _id: id };
      const update = { $push: { videos: savedVideo._id } };
      const options = { upsert: true };
      await models.User.findOneAndUpdate(filter, update, options);
      return savedVideo;
    },

    addView: async (_, { videoId }, { models }) => {
      const filter = { _id: videoId };
      const update = { $inc: { views: 1 } };
      return await models.Video.findOneAndUpdate(filter, update);
    },
    
    addLike: async (_, { videoId }, { models, user }) => {
      const filterUser = { _id: user.id };
      const filterVideo = { _id: videoId };
      const userInfo = await models.User.findOne(filterUser);
      const isLiked = userInfo.likes.find(i => i.toString() === videoId);
      const isDisliked = userInfo.dislikes.find(i => i.toString() === videoId);
      
      if (isLiked) {
        await models.User.findOneAndUpdate(filterUser, { $pull: { likes: videoId } });
        return await models.Video.findOneAndUpdate(filterVideo, { $inc: { likes: -1 } });
      } 
      else if (isDisliked) {
        await models.User.findOneAndUpdate(filterUser, { $push: { likes: videoId }, $pull: { dislikes: videoId } });
        return await models.Video.findOneAndUpdate(filterVideo, { $inc: { likes: 1, dislikes: -1 } });
      } 
      else {
        await models.User.findOneAndUpdate(filterUser, { $push: { likes: videoId }});
        return await models.Video.findOneAndUpdate(filterVideo, { $inc: { likes: 1 } });
      }
    },
    
    addDislike: async (_, { videoId }, { models, user }) => {
      const filterUser = { _id: user.id };
      const filterVideo = { _id: videoId };
      const userInfo = await models.User.findOne(filterUser);
      const isLiked = userInfo.likes.find(i => i.toString() === videoId);
      const isDisliked = userInfo.dislikes.find(i => i.toString() === videoId);
      
      if (isLiked) {
        await models.User.findOneAndUpdate(filterUser, { $pull: { likes: videoId }, $push: { dislikes: videoId } });
        return await models.Video.findOneAndUpdate(filterVideo, { $inc: { likes: -1, dislikes: 1 } });
      } 
      else if (isDisliked) {
        await models.User.findOneAndUpdate(filterUser, { $pull: { dislikes: videoId } });
        return await models.Video.findOneAndUpdate(filterVideo, { $inc: { dislikes: -1 } });
      }
      else {
        await models.User.findOneAndUpdate(filterUser, { $push: { dislikes: videoId }});
      return await models.Video.findOneAndUpdate(filterVideo, { $inc: { dislikes: 1 } });
      }
    }

  }
}


