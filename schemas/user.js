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
    bannerUrl: String
    bannerPosition: String
    about: String
    country: String
    links: [String]
    createdOn: String
  }

  type S3Banner {
    requestUrl: String
    s3BucketUrl: String
  }

  input AboutInput {
    about: String
    country: String
    links: String
  }

  type Query {
    getUserById(userId: ID!): User
    allUsers: [User!]!
    currentUser: User
  }

  type Mutation {
    s3SignBanner(filename: String!, filetype: String!): S3Banner
    addBanner(bannerUrl: String!): User
    addBannerPosition(bannerPosition: String!): User
    aboutTab(input: AboutInput): User
  }

`;