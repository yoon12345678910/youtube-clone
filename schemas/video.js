module.exports = `
  type Video {
    id: ID!
    owner: User
    title: String!
    url: String!
    description: String!
    posterUrl: String!
    createdOn: String!
    views: Int
    likes: Int
    dislikes: Int
    comments: [Comment]
  }

  type S3Payload {
    requestUrl: String
    s3BucketUrl: String
  }

  input VideoInput {
    title: String
    description: String
    posterUrl: String
    url: String
  }

  type Query {
    getVideoById(videoId: ID!): Video
  }

  type Mutation {
    s3SignVideo(filename: String!, filetype: String!): S3Payload
    createVideo(input: VideoInput): Video
    addView(videoId: ID!): Video
    addLike(videoId: ID!): Video
    addDislike(videoId: ID!): Video
  }
`;