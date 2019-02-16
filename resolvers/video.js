const aws = require('aws-sdk');

module.exports = {
  Mutation: {

    s3Sign: async (_, { filename, filetype }, context) => {
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
    }
  }
}


