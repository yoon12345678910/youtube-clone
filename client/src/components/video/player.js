import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';


const Player = styled.video`
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 25px;
  margin-bottom: 15px;
`;

const Title = styled(Typography)`
  text-align: left;
`;

const VideoPlayer = ({
  url,
  title
}) => {
  return (
    <Fragment>
      <Player src={url} controls />
      <Title variant='h5'>{title}</Title>
    </Fragment>
  )
}

VideoPlayer.defaultProps = {
  url: '',
  title: ''
}

VideoPlayer.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string
}

export default VideoPlayer;