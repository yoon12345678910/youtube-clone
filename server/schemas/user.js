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
    links: [String]
    createdOn: String
  }

  type Query {
    getUserById(userId: ID!): User
    allUsers: [User!]!
    currentUser: User
  }
`;