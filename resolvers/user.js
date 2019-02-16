module.exports = {
  Query: {

    getUserById: async (_, { userId }, { models }) => await models.User.findById(userId),

    allUsers: async (_, __, { models }) => await models.User.find({}),
    
  }
}