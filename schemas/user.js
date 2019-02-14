module.exports = `
  type User {
    id: ID!
    username: String!
    email: String!
    googleId: String
    imageUrl: String
    createOn: String
    videos: [Video]
  }

  type Query {
    getUser(userId: ID!): User
    allUsers: [User!]!
  }
`;