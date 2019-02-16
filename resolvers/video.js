const aws = require('aws-sdk');

module.exports = {
  Query: {

    getVideoById: async (_, { videoId }, { models }) => {
      return await models.Video.findById(videoId)
        .populate('owner')
        .exec();
    }

  },
  Mutation: {

    s3Sign: async (_, { filename, filetype }, __) => {
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
      const videoUrl = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;
      return { requestUrl, videoUrl };
    },

    createVideo: async (_, { input }, { models, user: { id } }) => {
      const { title, description, poster, url } = input;
      const video = new models.Video({
        owner: id,
        title,
        description,
        poster,
        url
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
    
    addLike: async (_, { videoId, remove }, { models, user}) => {
      const filter_1 = { _id: user.id };
      const update_1 = remove ? { $pull: { likes: videoId } } : { $push: { likes: videoId } };
      await models.User.findOneAndUpdate(filter_1, update_1);
      const filter_2 = { _id: videoId };
      const update_2 = { $inc: { likes: remove ? -1 : 1 } };
      return await models.Video.findOneAndUpdate(filter_2, update_2);
    },
    
    addDislike: async (_, { videoId, remove }, { models, user}) => {
      const filter_1 = { _id: user.id };
      const update_1 = remove ? { $pull: { dislikes: videoId } } : { $push: { dislikes: videoId } };
      await models.User.findOneAndUpdate(filter_1, update_1);
      const filter_2 = { _id: videoId };
      const update_2 = { $inc: { dislikes: remove ? -1 : 1 } };
      return await models.Video.findOneAndUpdate(filter_2, update_2);
    }

  }
}


