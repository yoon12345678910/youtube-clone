const aws = require('aws-sdk');

module.exports = {
  Query: {

    getUserById: async (_, { userId }, { models }) => await models.User.findById(userId),

    allUsers: async (_, __, { models }) => await models.User.find({}),

    currentUser: async (_, __, { models, user }) => {
      return models.User.findById(user.id)
        .populate({ path: 'videos', model: 'video' })
        .exec()
    },

  },

  Mutation: {

    s3SignBanner: async (_, { filename, filetype }, __) => {
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

    addBanner: async (_, { bannerUrl }, { models, user }) => {
      const currentUser = await models.User.findById(user.id);
      currentUser.bannerUrl = bannerUrl;
      await currentUser.save();
      return currentUser;
    },

    addBannerPosition: async (_, { bannerPosition }, { models, user }) => {
      const currentUser = await models.User.findById(user.id);
      currentUser.bannerPosition = bannerPosition;
      await currentUser.save();
      return currentUser;
    },

    aboutTab: async (_, { input: { about, country, links } }, { models, user }) => {
      const currentUser = await models.User.findById(user.id);
      currentUser.about = about;
      currentUser.country = country;
      currentUser.links = links.split(',').map(l => l.trim());
      await currentUser.save();
      return currentUser;
    }

  }


}