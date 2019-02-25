import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import SortIcon from '@material-ui/icons/Sort';
import { timeDifferenceForDate } from '../../../utils';


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 64px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 220px calc(100% - 220px);
`;

const PosterImage = styled.img`
  margin: 10px 0;
  width: 220px;
  height: 120px;
`;

const VideoInfo = styled.div`
  padding: 10px 20px;
  text-align: left;
`;

const sortControl = (videos, sort) => {
  if (sort === 'newest') return videos.reverse();
  else if (sort === 'oldest') return videos;
  else if (sort === 'popular') {
    return videos.sort((a, b) => b.views - a.views);
  }
};

const renderDescription = description => {
  if (description.length < 200) return description;
  return description.slice(0, 195) + '...';
};

const Videos = ({
  sort,
  filter,
  isShowSort,
  videos,
  onChangeSort,
  onChangeFilter,
  onOpenSort,
  onCloseSort
}) => {
  const sortedVideos = sortControl(videos.slice(), sort);

  return (
    <div>
      <Wrapper>
        <FormControl>
          <Select
            value={filter}
            onChange={onChangeFilter}>
            <MenuItem value='upload'>Uploads</MenuItem>
            <MenuItem value='liked'>Liked Videos</MenuItem>
            <MenuItem value='all'>All Videos</MenuItem>
          </Select>
        </FormControl>
        <Button id='sort' onClick={onOpenSort}><SortIcon />&nbsp; Sort By</Button>
        <Menu
          anchorEl={document.getElementById('sort')}
          open={isShowSort}
          onClose={onCloseSort}>
          <MenuItem onClick={() => onChangeSort('popular')}>Most Popular</MenuItem>
          <MenuItem onClick={() => onChangeSort('oldest')}>Date Added(oldest)</MenuItem>
          <MenuItem onClick={() => onChangeSort('newest')}>Date Added(newest)</MenuItem>
        </Menu>
      </Wrapper>
      {sortedVideos && sortedVideos.map((v, i) => {
        return (
          <div key={`video-${i}`}>
            <Grid>
              <Link to={`/video/${v.id}`}>
                <PosterImage
                  src={v.posterUrl}
                  alt='poster'/>
              </Link>
              <VideoInfo>
                <Typography variant='h6'>{v.title}</Typography>
                <Typography>{v.views} views &nbsp;&bull;&nbsp; {timeDifferenceForDate(v.createdOn)}</Typography>
                <Typography variant='body1'>{renderDescription(v.description)}</Typography>
              </VideoInfo>
            </Grid>
            <Divider />
          </div>
        )
      })}
    </div>
  )
};


Videos.defaultProps = {
  sort: 'newest',
  filter: 'upload',
  isShowSort: false,
  videos: [],
  onChangeSort: () => console.warn('onChangeSort not defined'),
  onChangeFilter: () => console.warn('onChangeFilter not defined'),
  onOpenSort: () => console.warn('onOpenSort not defined'),
  onCloseSort: () => console.warn('onCloseSort not defined')
}

Videos.propTypes = {
  sort: PropTypes.string,
  filter: PropTypes.string,
  isShowSort: PropTypes.bool,
  videos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    posterUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    views: PropTypes.number,
    createdOn: PropTypes.string
  })),
  onChangeSort: PropTypes.func,
  onChangeFilter: PropTypes.func,
  onOpenSort: PropTypes.func,
  onCloseSort: PropTypes.func,
}

export default Videos;