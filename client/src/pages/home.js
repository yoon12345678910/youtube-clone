import React, { Component } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import VideosGrid from '../components/home/videosGrid';
import VideoPreview from '../components/home/videoPreview';
import VideoTempPreview from '../components/home/videoTempPreview';


const Container = styled.div`
  margin: 0 auto;
  width: auto;
  text-align: center;
  @media (min-width: 1280px) {
    width: 1260px;
  }
`;

class Home extends Component {
  render() {
    const { data: { allVideos, loading, error } } = this.props;
    let videosGrid;

    if (error) return <p>ERROR: {error.message}</p>;

    if (loading) {
      videosGrid = Array.apply(null, Array(12)).map((_, index) => <VideoTempPreview key={index}/>);
    } else {
      videosGrid = allVideos.map(video => 
        <VideoPreview 
          key={video.id}
          id={video.id}
          title={video.title}
          url={video.url}
          createdOn={video.createdOn}
          posterUrl={video.posterUrl}
          views={video.views}
        />
      );
    }

    return (
      <Container>
        <VideosGrid>
          { videosGrid }
        </VideosGrid>
      </Container>
    );
  }
}

const ALL_VIDEOS = gql`
  query {
    allVideos {
      id
      title
      url
      createdOn
      posterUrl
      views
    }
  }
`

export default graphql(ALL_VIDEOS)(Home);