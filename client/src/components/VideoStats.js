import React  from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsDownIcon from '@material-ui/icons/ThumbDown';
import ReplyIcon from '@material-ui/icons/Reply';


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const Views = styled(Typography)`
  margin-top: 2vh;
`;

const IconButtonStyled = styled(IconButton)`
  margin-right: 3vh;
`;

const VideoStats = ({
  views,
  likes,
  dislikes,
  onThumbLike,
  onThumbDislike,
  onShareModalOpen
}) => {
  return (
    <Wrapper>
      <div>
        <Views type='subheading'>{views} views</Views>
      </div>
      <div>
        <IconButtonStyled onClick={onThumbLike}>
          <ThumbsUpIcon />&nbsp;
          <Typography type='button'>{likes}</Typography>
        </IconButtonStyled>
        <IconButtonStyled onClick={onThumbDislike}>
          <ThumbsDownIcon />&nbsp;
          <Typography type='button'>{dislikes}</Typography>
        </IconButtonStyled>
        <IconButtonStyled onClick={onShareModalOpen}>
          <ReplyIcon />
          <Typography type='button'>Share</Typography>
        </IconButtonStyled>
      </div>
    </Wrapper>
  )
}

VideoStats.defaultProps = {
  views: 0,
  likes: 0,
  dislikes: 0,
  onThumbLike: () => console.warn('onThumbLike not defined'),
  onThumbDislike: () => console.warn('onThumbDislike not defined'),
  onShareModalOpen: () => console.warn('onShareModalOpen not defined')
}

VideoStats.propTypes = {
  views: PropTypes.number,
  likes: PropTypes.number,
  dislikes: PropTypes.number,
  onThumbLike: PropTypes.func,
  onThumbDislike: PropTypes.func,
  onShareModalOpen: PropTypes.func
}

export default VideoStats;