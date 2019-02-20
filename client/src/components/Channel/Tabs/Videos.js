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


const renderDescription = description => {
  if (description.length < 200) return description;
  return description.slice(0, 195) + '...';
}

const Videos = ({
  sortBy,
  videoList,
  sortMenu,
  videos,
  onSortBy,
  onChangeVideoList,
  onOpenSortMenu,
  onCloseSortMenu
}) => {
  return (
    <div>
      <Wrapper>
        <FormControl>
          <Select
            value={videoList}
            onChange={onChangeVideoList}>
            <MenuItem value='upload'>Uploads</MenuItem>
            <MenuItem value='liked'>Liked Videos</MenuItem>
            <MenuItem value='all'>All Videos</MenuItem>
          </Select>
        </FormControl>
        <Button id='sort' onClick={onOpenSortMenu}><SortIcon />&nbsp; Sort By</Button>
        <Menu
          open={sortMenu}
          anchorEl={document.getElementById('sort')}
          onClose={onCloseSortMenu}>
          <MenuItem onClick={() => onSortBy('popular')}>Most Popular</MenuItem>
          <MenuItem onClick={() => onSortBy('oldest')}>Date Added(oldest)</MenuItem>
          <MenuItem onClick={() => onSortBy('newest')}>Date Added(newest)</MenuItem>
        </Menu>
      </Wrapper>
      {videos && videos.map((v, i) => {
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
  sortBy: 'newest',
  videoList: 'upload',
  sortMenu: false,
  videos: [],
  onSortBy: () => console.warn('onSortBy not defined'),
  onChangeVideoList: () => console.warn('onChangeVideoList not defined'),
  onOpenSortMenu: () => console.warn('onOpenSortMenu not defined'),
  onCloseSortMenu: () => console.warn('onCloseSortMenu not defined')
}

Videos.propTypes = {
  sortBy: PropTypes.string,
  videoList: PropTypes.string,
  sortMenu: PropTypes.bool,
  videos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    posterUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    views: PropTypes.number,
    createdOn: PropTypes.string
  })),
  onSortBy: PropTypes.func,
  onChangeVideoList: PropTypes.func,
  onOpenSortMenu: PropTypes.func,
  onCloseSortMenu: PropTypes.func,
}

export default Videos;