import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';

import Banner from '../components/Channel/Banner';
import AppTabs from '../components/Channel/AppTabs';
import Modal from '../components/Channel/Modal';
import SettingsModal from '../components/Channel/SettingsModal';
import Videos from '../components/Channel/Tabs/Videos';
import { formatFilename } from '../utils';


class Channel extends Component {
  constructor() {
    super();

    this.state = {
      progress: 0,
      tabIndex: 0,
      sortBy: 'newest',
      videoList: 'upload',
      searchString: '',
      modal: false,
      sortMenu: false,
      settingsModal: false,
      searchMode: false,
      bannerPosition: null
    };

    this.bannerUrlTemp = '';
    this.handleDrop = this.handleDrop.bind(this);
    this.handleBannerUpload = this.handleBannerUpload.bind(this);
    this.handleSaveBannerPosition = this.handleSaveBannerPosition.bind(this);
    this.handleTabs = this.handleTabs.bind(this);
    this.handleTabIndex = this.handleTabIndex.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleCancelUpload = this.handleCancelUpload.bind(this);
    this.handleOpenSortMenu = this.handleOpenSortMenu.bind(this);
    this.handleCloseSortMenu = this.handleCloseSortMenu.bind(this);
    this.handleSortBy = this.handleSortBy.bind(this);
    this.handleOpenSettingsModal = this.handleOpenSettingsModal.bind(this);
    this.handleCloseSettingsModal = this.handleCloseSettingsModal.bind(this);
    this.handleBannerPosition = this.handleBannerPosition.bind(this);
    this.handleVideoList = this.handleVideoList.bind(this);
    this.handleSearchString = this.handleSearchString.bind(this);
    this.handleSearchMode = this.handleSearchMode.bind(this);
  }

  Upload = async file => {
    const filename = formatFilename(file.name);
    const banner = await this.s3SignBanner(filename, file.type);
    this.setState({ modal: true });
    this.bannerUrlTemp = banner.s3BucketUrl;
    this.uploadToS3Banner(banner.requestUrl, file);
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

  sortControl = (videos, sortBy) => {
    if (sortBy === 'newest') return videos.reverse();
    else if (sortBy === 'oldest') return videos;
    else if (sortBy === 'popular') {
      return videos.sort((a, b) => b.views - a.views);
    }
  }

  handleDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    this.Upload(file);
  }
  
  handleBannerUpload = async () => {
    await this.props.addBanner({ variables: { bannerUrl: this.bannerUrlTemp } });
    this.handleCancelUpload();
  }

  handleSaveBannerPosition = async () => {
    const { bannerPosition } = this.state;
    await this.props.addBannerPosition({
      variables: { bannerPosition },
      refetchQueries: [{
        query: CURRENT_USER
      }]
    });
    await this.setState({ 
      bannerPosition: null, 
      settingsModal: false 
    });
  }

  handleTabs = (e, tabIndex) => this.setState({ tabIndex })

  handleTabIndex = tabIndex => this.setState({ tabIndex })

  handleModalClose = () => this.setState({ modal: false })

  handleCancelUpload = () => this.setState({ modal: false })

  handleOpenSortMenu = () => this.setState({ sortMenu: true })

  handleCloseSortMenu = () => this.setState({ sortMenu: false })

  handleSortBy = sortBy => this.setState({ sortBy, sortMenu: false })

  handleOpenSettingsModal = () => this.setState({ settingsModal: true })

  handleCloseSettingsModal = () => this.setState({ settingsModal: false })

  handleBannerPosition = (_, bannerPosition) => this.setState({ bannerPosition })

  handleVideoList = type => this.setState({ videoList: type })

  handleSearchString = e => this.setState({ searchString: e.target.value })

  handleSearchMode = () => this.setState({ searchMode: true })

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

    console.log(currentUser.bannerUrl)

    const {
      progress,
      tabIndex,
      sortBy,
      sortMenu,
      videoList,
      searchString,
      modal,
      settingsModal,
      searchMode,
      // bannerPosition
    } = this.state;

    const sortedVideos = this.sortControl(videos.slice(), sortBy);

    return (
      <div>
        <Banner
          bannerUrl={bannerUrl}
          bannerPosition={bannerPosition}
          onDrop={this.handleDrop}
        />
        <AppTabs
          tabIndex={tabIndex}
          username={username}
          imageUrl={imageUrl}
          searchMode={searchMode}
          searchString={searchString}
          onTabs={this.handleTabs}
          onSearchMode={this.handleSearchMode}
          onSearchString={this.handleSearchString}
          onOpenSettingsModal={this.handleOpenSettingsModal}
        />
        <SwipeableViews
          axis='x'
          index={tabIndex}
          onChangeIndex={this.handleTabIndex}
          enableMouseEvents >
          <div>home</div>
          <Videos
            sortBy={sortBy}
            videoList={videoList}
            sortMenu={sortMenu}
            videos={sortedVideos}
            onSortBy={this.handleSortBy}
            onVideoList={this.handleVideoList}
            onOpenSortMenu={this.handleOpenSortMenu}
            onCloseSortMenu={this.handleCloseSortMenu}
          />
          <div>THREE</div>
          <div>FOUR</div>
          <div>FIVE</div>
          <div>SIX</div>
        </SwipeableViews>
        <Modal
          open={modal}
          progress={progress}
          onModalClose={this.handleModalClose}
          onCancelUpload={this.handleCancelUpload}
          onUploadBanner={this.handleBannerUpload}
        />
        <SettingsModal
          open={settingsModal}
          bannerPosition={''}
          onSaveBannerPosition={this.handleSaveBannerPosition}
          onSetBannerPosition={this.handleBannerPosition}
          onCloseSettingsModal={this.handleCloseSettingsModal}
        />
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
`

export default compose(
  graphql(S3_SIGN_BANNER, { name: 's3SignBanner' }),
  graphql(ADD_BANNER, { name: 'addBanner' }),
  graphql(ADD_BANNER_POSITION, { name: 'addBannerPosition' }),
  graphql(CURRENT_USER)
)(Channel);