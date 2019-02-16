import React, { Component } from 'react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsDownIcon from '@material-ui/icons/ThumbDown';
import ReplyIcon from '@material-ui/icons/Reply';
import { timeDifferenceForDate } from '../utils';


const styles = {
  CONTAINER: {
    marginTop: '3vh',
    display: 'grid',
    gridTemplateColumns: '70% 30%'
  },
  VIDEO: {
    height: '72vh',
    marginLeft: '3vh'
  },
  VIDEO_STATS: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  VIEWS: {
    marginTop: '2vh'
  },
  SPACER: {
    marginRight: '3vh'
  },
  VIDEO_INFO: {
    display: 'grid',
    gridTemplateColumns: '10% 70% 20%',
    marginTop: '3vh',
    marginBottom: '3vh'
  },
  AVATAR: {
    height: '8vh',
    width: '8vh'
  },
  SUB_BUTTON: {
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
    height: '6.5vh'
  }
};

class Video extends Component {

  componentDidMount() {
    this.handleAddView();
  }

  handleAddView = async () => {
    await this.props.addView({ variables: { videoId: this.props.match.params.videoId } });
  }

  handleThumbs = async (control) => {
    const likesArray = this.props.data.getVideoById.owner.likes
    const dislikesArray = this.props.data.getVideoById.owner.dislikes
    const { videoId } = this.props.match.params
    const likedId = likesArray.find(l => l === videoId)
    const dislikedId = dislikesArray.find(d => d === videoId)

    if (!dislikedId && !likedId) {
      if (control === 'like') {
        let remove = false
        return await this.props.addLike({
          variables: { videoId, remove },
          refetchQueries: [{
            query: VIDEO_BY_ID,
            variables: { videoId }
          }]
        })
      } else if (control === 'dislike') {
        let remove = false
        return await this.props.addDislike({
          variables: { videoId, remove },
          refetchQueries: [{
            query: VIDEO_BY_ID,
            variables: { videoId }
          }]
        })
      }
    } else if (!dislikedId && likedId) {
      if (control === 'like') {
        let remove = true
        return await this.props.addLike({
          variables: { videoId, remove },
          refetchQueries: [{
            query: VIDEO_BY_ID,
            variables: { videoId }
          }]
        })
      } else if (control === 'dislike') return
    } else if (dislikedId && !likedId) {
      if (control === 'dislike') {
        let remove = true
        return await this.props.addDislike({
          variables: { videoId, remove },
          refetchQueries: [{
            query: VIDEO_BY_ID,
            variables: { videoId }
          }]
        })
      } else if (control === 'like') return
    }
  }

  render() {
    const { data: { getVideoById, loading, error } } = this.props;

    if (loading) return null;
    if (error) return <p>ERROR: {error.message}</p>;

    const {
      title,
      description,
      url,
      poster,
      createdOn,
      views,
      likes,
      dislikes,
      owner: {
        id,
        username,
        imageUrl
      }
    } = getVideoById;

    return (
      <div style={styles.CONTAINER}>
        <div>
          <video src={url} controls style={styles.VIDEO} />
          <Typography type='headline'>{title}</Typography>
          <div style={styles.VIDEO_STATS}>
            <div>
              <Typography type='subheading' style={styles.VIEWS}>{views} views</Typography>
            </div>
            <div>
              <IconButton style={styles.SPACER} onClick={this.handleThumbs.bind(this, 'like')}>
                <ThumbsUpIcon />&nbsp;
                <Typography type='button'>{likes}</Typography>
              </IconButton>
              <IconButton style={styles.SPACER} onClick={this.handleThumbs.bind(this, 'dislike')}>
                <ThumbsDownIcon />&nbsp;
                <Typography type='button'>{dislikes}</Typography>
              </IconButton>
              <IconButton style={styles.SPACER}>
                <ReplyIcon />
                <Typography type='button'>Share</Typography>
              </IconButton>
            </div>
          </div>
          <Divider />
          <div style={styles.VIDEO_INFO}>
            <Avatar src={imageUrl} alt='user' style={styles.AVATAR} />
            <div>
              <Typography type='title'>{username}</Typography>
              <Typography>Posted {timeDifferenceForDate(createdOn)}</Typography>
              <br />
              <br />
              <Typography>{description}</Typography>
            </div>
            <Button
              style={styles.SUB_BUTTON}>
              Subscribe
            </Button>
          </div>
          <Divider />
        </div>
      </div>
    );
  }
};

const VIDEO_BY_ID = gql`
  query ($videoId: ID!) {
    getVideoById(videoId: $videoId) {
      title
      description
      url
      poster
      views
      likes
      dislikes
      createdOn
      owner {
        id
        username
        imageUrl
        likes
        dislikes
      }
    }
  }
`;

const ADD_VIEW = gql`
  mutation($videoId: ID!) {
    addView(videoId: $videoId){
      views
    }
  }
`;

const ADD_LIKE = gql`
  mutation($videoId: ID!, $remove: Boolean!) {
    addLike(videoId: $videoId, remove: $remove) {
      likes
    }
  }
`;

const ADD_DISLIKE = gql`
  mutation($videoId: ID!, $remove: Boolean!) {
    addDislike(videoId: $videoId, remove: $remove) {
      dislikes
    }
  }
`;


export default compose(
  graphql(ADD_VIEW, { name: 'addView' }),
  graphql(ADD_LIKE, { name: 'addLike' }),
  graphql(ADD_DISLIKE, { name: 'addDislike' }),
  graphql(VIDEO_BY_ID, { options: props => ({ variables: { videoId: props.match.params.videoId }})})
)(Video);