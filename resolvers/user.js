module.exports = {
  Query: {

    getUserById: async (_, { userId }, { models }) => await models.User.findById(userId),

    allUsers: async (_, __, { models }) => await models.User.find({}),

    currentUser: async (_, { userId }, { models, user }) => await models.User.getUserById(user.id)
    
  }
}