module.exports = `
  type Comment  {
    id: ID
    text: String
    reply: Boolean
    likes: Int
    dislikes: Int
    postedBy: User
    postedAbout: Video
    subComments: [Comment]
    createdOn: String
  }

  type Mutation {
    createComment(text: String!, reply: Boolean!, videoId: ID!): Comment
    createSubComment(text: String!, reply: Boolean!, commentId: ID!): Comment
  }
`;