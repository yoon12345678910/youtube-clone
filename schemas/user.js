module.exports = `
  type User {
    id: ID!
    username: String!
    email: String!
    imageUrl: String
    jwt: String
    googleId: String
    videos: [Video]
    likes: [ID!]
    dislikes: [ID!]
    createOn: String
  }

  type Query {
    getUserById(userId: ID!): User
    allUsers: [User!]!
  }
`;