import React, { Component } from 'react';
import { withApollo, graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import axios from 'axios';
import { default as BannerScreen } from '../../components/Channel/Banner';
import { formatFilename } from '../../utils';


class Banner extends Component {
  constructor() {
    super();

    this.state = {
      isShowUpload: false,
      isShowSettings: false,
      progress: 0,
      bannerPosition: ''
    };

    this.file = null;
    this.handleDrop = this.handleDrop.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleCloseUpload = this.handleCloseUpload.bind(this);
    this.handleChangeSettings = this.handleChangeSettings.bind(this);
    this.handleCloseSettings = this.handleCloseSettings.bind(this); 
    this.handleSaveSettings = this.handleSaveSettings.bind(this);
  }

  s3SignBanner = async (name, type) => {
    const response = await this.props.s3SignBanner({
      variables: { 
        filename: `banners/${name}`,
        filetype: type
      }
    });
    const { requestUrl, s3BucketUrl } = response.data.s3SignBanner;
    return { requestUrl, s3BucketUrl };
  }

  uploadToS3Banner = async (requestUrl, file) => {
    const options = {
      headers: { 'Content-Type': file.type },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        this.setState({ progress: percentCompleted });
      }
    };
    axios.put(requestUrl, file, options);
  }
  
  handleDrop = acceptedFiles => {
    this.file = acceptedFiles[0];
    this.setState({ progress: 0, isShowUpload: true });
  }

  handleUpload = async () => {
    const filename = formatFilename(this.file.name);
    const banner = await this.s3SignBanner(filename, this.file.type);
    await this.uploadToS3Banner(banner.requestUrl, this.file);
    await this.props.addBanner({
      variables: { bannerUrl: banner.s3BucketUrl },
      refetchQueries: [{ query: CURRENT_USER }]
    });
    this.handleCloseUpload();
  }

  handleSaveSettings = async () => {
    const { bannerPosition } = this.state;
    await this.props.addBannerPosition({
      variables: { bannerPosition },
      refetchQueries: [{ query: CURRENT_USER }]
    });
    await this.handleCloseSettings();
  }

  handleCloseUpload = () => this.setState({ isShowUpload: false })

  handleCloseSettings = () => this.setState({ isShowSettings: false, bannerPosition: '' })

  handleChangeSettings = (_, bannerPosition) => this.setState({ bannerPosition })

  render() {
    console.log(this.props)
    const { data: { loading, currentUser } } = this.props;
    if (loading) return null;

    const { 
      bannerUrl, 
      bannerPosition
    } = currentUser;

    return (
      <BannerScreen
        bannerUrl={bannerUrl}
        bannerPosition={this.state.bannerPosition === '' ? bannerPosition : this.state.bannerPosition}
        isShowUpload={this.state.isShowUpload}
        isShowSettings={this.state.isShowSettings}
        progress={this.state.progress}
        onDrop={this.handleDrop}
        onUpload={this.handleUpload}
        onCloseUpload={this.handleCloseUpload}
        onChangeSettings={this.handleChangeSettings}
        onCloseSettings={this.handleCloseSettings}
        onSaveSettings={this.handleSaveSettings}
      />
    )
  }
}

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

const CURRENT_USER = gql`
  query {
    currentUser {
      username
      email
      imageUrl
      createdOn
      bannerUrl
      bannerPosition
      videos {
        id
        title
        url
        description
        createdOn
        posterUrl
        views
        likes
      }
    }
  }
`;

const S3_SIGN_BANNER = gql`
  mutation ($filename: String!, $filetype: String!) {
    s3SignBanner(filename: $filename, filetype: $filetype) {
      requestUrl
      s3BucketUrl
    }
  }
`;

const ADD_BANNER = gql`
  mutation ($bannerUrl: String!) {
    addBanner(bannerUrl: $bannerUrl) {
      bannerUrl
    }
  }
`;

const ADD_BANNER_POSITION = gql`
  mutation ($bannerPosition: String!) {
    addBannerPosition(bannerPosition: $bannerPosition) {
      bannerPosition
    }
  }
`;

const IS_SHOW_SETTINGS_MODAL = gql`
  query {
    isShowSettings @client
  }
`;

export default compose(
  withApollo,
  graphql(S3_SIGN_BANNER, { name: 's3SignBanner' }),
  graphql(ADD_BANNER, { name: 'addBanner' }),
  graphql(ADD_BANNER_POSITION, { name: 'addBannerPosition' }),
  graphql(IS_SHOW_SETTINGS_MODAL),
  graphql(GET_CHANNEL),
  graphql(CURRENT_USER)
)(Banner);