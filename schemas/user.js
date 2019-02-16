module.exports = `
  type User {
    id: ID!
    username: String!
    email: String!
    googleId: String
    imageUrl: String
    createOn: String
    videos: [String]
    jwt: String
  }

  type Query {
    getUserById(userId: ID!): User
    currentUser(userId: ID): User
    allUsers: [User!]!
  }
`;