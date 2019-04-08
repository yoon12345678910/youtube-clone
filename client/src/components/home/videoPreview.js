import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { timeDifferenceForDate } from '../../utils';


const LinkStyled = styled(Link)`
  :link { 
    color: #DDDDDD; 
    text-decoration: none;
  }
  :visited { 
    color: #DDDDDD; 
    text-decoration: none;
  }
  :hover { 
    color: #DDDDDD; 
    text-decoration: underline;
  }
`;

const Poster = styled.div`
  border-radius: 4px;
  background-image: ${props => `url(${props.posterUrl})`};
  width: 300px;
  height: 180px;
  background-size: 300px 180px;
`;

const Title = styled.div`
  margin-top: 5px;
  font-size: 15px;
  text-align: left;
`;

const Content = styled.div`
  margin-top: 5px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  text-align: left;
`;

const VideoPreview = ({
  id,
  title,
  createdOn,
  views,
  posterUrl
}) => {
  return (
    <LinkStyled to={`/video/${id}`}>
      <Poster posterUrl={posterUrl} alt={title} />
      <Title>{title}</Title>
      <Content>
        <span>조회수&nbsp;{views}회&nbsp;•&nbsp;</span>
        <span>{timeDifferenceForDate(createdOn)}</span>
      </Content>
    </LinkStyled>
  );
}

VideoPreview.defaultProps = {
  id: '',
  title: '',
  createdOn: '',
  views: 0,
  posterUrl: ''
}

VideoPreview.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  createdOn: PropTypes.string,
  views: PropTypes.number,
  posterUrl: PropTypes.string
}

export default VideoPreview;