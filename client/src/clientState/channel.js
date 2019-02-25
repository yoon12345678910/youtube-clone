import gql from 'graphql-tag';

export const defaults = {
  channel: {
    __typename: 'Channel',
    banner: {
      __typename: 'Banner',
      isShowUpload: false,
      isShowSettings: false,
      progress: 0,
      bannerPosition: '',
    },
  }
};

export const typeDefs = `
  
  type Channel {
    file: File
    banner: Banner
  }

  Type Banner {
    isShowUpload: Boolean,
    isShowSettings: Boolean,
    progress: Number,
    bannerPosition: String
  }

  type File {
    name: String
    type: String
  }
  
  type Mutation {
    updateFile(file: File!): File
    showUploadModal(isShow: Boolean!): Channel
  }
  
  type Query {
    channel: Channel
    file: File
    uploadModal: Channel
  }
`;

const GET_CHANNEL = gql`
  {
    channel @client {
      banner {
        isShowUpload
        isShowSettings
        progress
        bannerPosition
      }
    }
  }
`;

export const resolvers = {

  Mutation: {
    
    updateFile: (_, { file }, { cache }) => {
      const data = { Channel: { file } };
      cache.writeData({ data });
      return null;
    },

    toggleBannerUploadModal: (_, { isShowUpload }, { cache }) => {
      const { channel } = cache.readQuery({ query: GET_CHANNEL });
      const uploadModal = { ...channel.banner, isShowUpload, __typename: 'Banner' };
      const data = { channel: {
        ...channel,
        uploadModal
      } };
      cache.writeData({ data });
      return uploadModal;
    },

  },

};