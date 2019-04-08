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

}