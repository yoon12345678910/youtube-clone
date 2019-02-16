module.exports = `
  type User {
    id: ID!
    username: String!
    email: String!
    googleId: String
    imageUrl: String
    createOn: String
    videos: [Video]
    jwt: String
    likes: [ID!]
    dislikes: [ID!]
  }

  type Query {
    getUserById(userId: ID!): User
    allUsers: [User!]!
  }
`;