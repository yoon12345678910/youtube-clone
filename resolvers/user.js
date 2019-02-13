module.exports = {
  Query: {
    getUser: (_, { userId }, { models }) => models.User.findById(userId),
    allUsers: (_, __, { models }) => models.User.find({})
  }
}