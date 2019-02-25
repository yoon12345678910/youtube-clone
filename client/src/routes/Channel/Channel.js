import React, { Component } from 'react';
import { withApollo, graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';

import AppTabs from '../components/Channel/AppTabs';
// import BannerUploadModal from '../components/Channel/BannerUploadModal';
import BannerSettingsModal from '../components/Channel/BannerSettingsModal';
import Banner from '../containers/Channel/Banner';
import Videos from '../containers/Channel/Videos';
import { formatFilename } from '../utils';


class Channel extends Component {
  constructor() {
    super();

    this.state = {
      tabIndex: 0,
      searchString: '',
      settingsModal: false,
      searchMode: false
    };

    this.handleTabs = this.handleTabs.bind(this);
    this.handleTabIndex = this.handleTabIndex.bind(this);
    this.handleSearchString = this.handleSearchString.bind(this);
    this.handleSearchMode = this.handleSearchMode.bind(this);
    this.handleOpenSettings = this.handleOpenSettings.bind(this);
  }

  handleTabs = (e, tabIndex) => this.setState({ tabIndex })

  handleTabIndex = tabIndex => this.setState({ tabIndex })

  handleSearchString = e => this.setState({ searchString: e.target.value })

  handleSearchMode = () => this.setState({ searchMode: true })

  handleOpenSettings = () => {
    this.props.client.mutate({
      mutation: gql`
        mutation ToggleBannerUploadModal($isShowUpload: Boolean!) {
          toggleBannerUploadModal(isShowUpload: $isShowUpload) @client {
            isShowUpload
          }
        }
      `,
      variables: { isShowUpload: true }
    });
    console.log('handleOpenSettings', this.props.client.cache);
  }

  render() {
    const { data: { loading, currentUser } } = this.props;
    if (loading) return null;

    const { 
      videos, 
      imageUrl, 
      username, 
      bannerUrl, 
      bannerPosition
    } = currentUser;

    const {
      progress,
      tabIndex,
      searchString,
      uploadModal,
      settingsModal,
      searchMode
    } = this.state;

    return (
      <div>
        <Banner />
        <AppTabs
          tabIndex={tabIndex}
          username={username}
          imageUrl={imageUrl}
          searchMode={searchMode}
          searchString={searchString}
          onTabs={this.handleTabs}
          onSearchMode={this.handleSearchMode}
          onSearchString={this.handleSearchString}
          onOpenSettings={this.handleOpenSettings}
        />
        <SwipeableViews
          axis='x'
          index={tabIndex}
          onChangeIndex={this.handleTabIndex}
          enableMouseEvents >
          <div>home</div>
          <Videos/>
          <div>THREE</div>
          <div>FOUR</div>
          <div>FIVE</div>
          <div>SIX</div>
        </SwipeableViews>
        {/* <BannerUploadModal
          open={uploadModal}
          progress={progress}
          onClose={this.handleModalClose}
          onUpload={this.handleBannerUpload}
        /> */}
        {/* <BannerSettingsModal
          open={settingsModal}
          bannerPosition={modalBannerPosition}
          onSave={this.handleSaveBannerPosition}
          onChange={this.handleChangeBannerPosition}
          onClose={this.handleCloseSettingsModal}
        /> */}
      </div>
    )
  }
}

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

export default compose(
  withApollo,
  graphql(S3_SIGN_BANNER, { name: 's3SignBanner' }),
  graphql(ADD_BANNER, { name: 'addBanner' }),
  graphql(ADD_BANNER_POSITION, { name: 'addBannerPosition' }),
  graphql(CURRENT_USER)
)(Channel);