module.exports = {
  Mutation: {

    createComment: async (_, { text, reply, videoId }, { models, user }) => {
      const comment = new models.Comment({
        text,
        reply,
        postedBy: user.id,
        postedAbout: videoId,
        createdOn: new Date()
      });
      const savedComment = await comment.save();
      const update = { $push: { comments: savedComment._id } };
      const options = { upsert: true };
      await models.Video.findOneAndUpdate({ _id: videoId }, update, options);
      return savedComment;
    },

    createSubComment: async (_, { text, reply, commentId }, { models, user }) => {
      const comment = new models.Comment({
        text,
        reply,
        postedBy: user.id,
        createdOn: new Date()
      });
      const savedComment = await comment.save();
      const update = { $push: { subComments: savedComment._id }};
      const options = { upsert: true };
      await models.Comment.findOneAndUpdate({ _id: commentId }, update, options);
      return savedComment;
    }

  }
}