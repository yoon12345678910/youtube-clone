import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';


const Wrapper = styled.div`
  text-align: left;
`;

const Player = styled.video`
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 15px;
`;

const VideoMain = ({
  url,
  title,
  children
}) => {
  return (
    <Wrapper>
      <Player src={url} controls />
      <Typography variant='headline'>{title}</Typography>
      { children }
    </Wrapper>
  )
}

VideoMain.defaultProps = {
  url: '',
  title: '',
  children: null
}

VideoMain.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.element
}

export default VideoMain;