import React, { Component } from 'react';
import { withApollo, graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { default as VideosPage } from '../../components/Channel/Tabs/Videos';


class Videos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: 'newest',
      filter: 'upload',
      isShowSort: false,
    };

    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleOpenSort = this.handleOpenSort.bind(this);
    this.handleCloseSort = this.handleCloseSort.bind(this);
  }

  handleChangeSort = sort => this.setState({ sort, isShowSort: false })

  handleChangeFilter = e => this.setState({ filter: e.target.value })

  handleOpenSort = () => this.setState({ isShowSort: true })

  handleCloseSort = () => this.setState({ isShowSort: false })

  render() {
    const videos = this.props.data.currentUser.videos;
    const {
      sort,
      filter,
      isShowSort
    } = this.state;

    if (!videos) return null;

    return (
      <VideosPage
        sort={sort}
        filter={filter}
        videos={videos}
        isShowSort={isShowSort}
        onChangeSort={this.handleChangeSort}
        onChangeFilter={this.handleChangeFilter}
        onOpenSort={this.handleOpenSort}
        onCloseSort={this.handleCloseSort}
      />
    )
  }
}

const GET_ViDEOS = gql`
  query {
    currentUser {
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

export default compose(
  withApollo,
  graphql(GET_ViDEOS)
)(Videos);