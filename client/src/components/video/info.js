import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { timeDifferenceForDate } from '../../utils';


const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 80px calc(100% - 230px) 150px;
  margin-top: 3vh;
  margin-bottom: 3vh;
  text-align: left;
`;

const AvatarStyled = styled(Avatar)`
  && {
    width: 55px;
    height: 55px;
  }
`;

const SubscribeButton = styled(Button)`
  height: 6.5vh;
  background-color: #ff0000;
  color: #fff;
`;

const VideoInfo = ({
  imageUrl,
  username,
  Posted,
  description
}) => {
  return (
    <Wrapper>
      <AvatarStyled src={imageUrl} alt='user' />
      <div>
        <Typography type='title'>{username}</Typography>
        <Typography>Posted {timeDifferenceForDate(Posted)}</Typography>
        <br />
        <br />
        <Typography>{description}</Typography>
      </div>
      <SubscribeButton>Subscribe</SubscribeButton>
    </Wrapper>
  )
}

VideoInfo.defaultProps = {
  imageUrl: '',
  username: '',
  Posted: '',
  description: ''
}

VideoInfo.propTypes = {
  imageUrl: PropTypes.string,
  username: PropTypes.string,
  Posted: PropTypes.string,
  description: PropTypes.string
}

export default VideoInfo;