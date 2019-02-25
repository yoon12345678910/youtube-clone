import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import VideoMain from '../components/VideoMain';
import VideoStats from '../components/VideoStats';
import VideoInfo from '../components/VideoInfo';
import VideoComment from '../components/VideoComment';
import ShareModal from '../components/ShareModal';
import EmbedModal from '../components/EmbedModal';


class Video extends Component {
  constructor() {
    super();

    this.state = {
      shareDialogOpen: false,
      copySnackbarOpen: false,
      embedDialogOpen: false,
      linkToShare: '',
      comment: '',
      subComment: '',
      visibleReplyInput: -1
    }

    this.ThumbsTimer = null;
    this.linkTextRef = React.createRef();
    this.iframeRef = React.createRef();
    this.handleShareModalOpen = this.handleShareModalOpen.bind(this);
    this.handleShareModalClose = this.handleShareModalClose.bind(this);
    this.handleEmbedModalClose = this.handleEmbedModalClose.bind(this);
    this.handleEmbedModalOpen = this.handleEmbedModalOpen.bind(this);
    this.handleCopySnackbarOpen = this.handleCopySnackbarOpen.bind(this);
    this.handleCopySnackbarClose = this.handleCopySnackbarClose.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.handleResetComment = this.handleResetComment.bind(this);
    this.handleCreateComment = this.handleCreateComment.bind(this);
    this.handleCopySnackbarClose = this.handleCopySnackbarClose.bind(this);
    this.handleChangeSubComment = this.handleChangeSubComment.bind(this);
    this.handleResetSubComment = this.handleResetSubComment.bind(this);
    this.handleCreateSubComment = this.handleCreateSubComment.bind(this);
    this.handleVisibleReply = this.handleVisibleReply.bind(this);
  }

  componentDidMount() {
    this.handleAddView();
    this.setState({ linkToShare: `http://localhost:3000/video/${this.props.match.params.videoId}` })
  }

  handleAddView = async () => {
    await this.props.addView({ variables: { videoId: this.props.match.params.videoId } });
  }

  handleThumbs = async (control) => {
    clearTimeout(this.ThumbsTimer);

    this.ThumbsTimer = setTimeout(async () => {
      const { videoId } = this.props.match.params;

      if (control === 'like') {
        await this.props.addLike({
          variables: { videoId },
          refetchQueries: [{
            query: VIDEO_BY_ID,
            variables: { videoId }
          }]
        });
      } else if (control === 'dislike') {
        await this.props.addDislike({
          variables: { videoId },
          refetchQueries: [{
            query: VIDEO_BY_ID,
            variables: { videoId }
          }]
        });
      }
    }, 300);
  }

  handleCopy = () => this.setState({ copySnackbarOpen: true })

  handleShareModalOpen = () => this.setState({ shareDialogOpen: true })

  handleShareModalClose = () => this.setState({ shareDialogOpen: false })

  handleEmbedModalClose = () => this.setState({ embedDialogOpen: false })

  handleEmbedModalOpen = () => this.setState({ embedDialogOpen: true, shareDialogOpen: false })

  handleCopySnackbarOpen = () => this.setState({ copySnackbarOpen: true })

  handleCopySnackbarClose = () => this.setState({ copySnackbarOpen: false })

  handleChangeComment = (e) => this.setState({ comment: e.target.value })

  handleResetComment = () => this.setState({ comment: '' })

  handleChangeSubComment = (e) => this.setState({ subComment: e.target.value })

  handleResetSubComment = () => this.setState({ subComment: '',  visibleReplyInput: -1 })

  handleVisibleReply = (i) => this.setState({ visibleReplyInput: i, subComment: '' })

  handleCreateComment = async () => {
    const text = this.state.comment;
    const reply = true;
    const { videoId } = this.props.match.params;

    this.handleResetComment();
    await this.props.createComment({
      variables: { text, reply, videoId },
      refetchQueries: [{
        query: VIDEO_BY_ID,
        variables: { videoId }
      }]
    });
  }

  handleCreateSubComment = async (commentId) => {
    const text = this.state.subComment;
    const reply = false;
    const { videoId } = this.props.match.params;

    this.handleResetSubComment();
    await this.props.createSubComment({
      variables: { text, reply, commentId },
      refetchQueries: [{
        query: VIDEO_BY_ID,
        variables: { videoId }
      }]
    });
  }

  render() {
    const { data: { getVideoById, loading, error } } = this.props;

    if (loading) return null;
    if (error) return <p>ERROR: {error.message}</p>;

    const {
      title,
      description,
      url,
      views,
      likes,
      dislikes,
      owner: {
        username,
        imageUrl
      },
      comments,
      createdOn
    } = getVideoById;

    const {
      comment,
      shareDialogOpen,
      copySnackbarOpen,
      embedDialogOpen,
      linkToShare,
      subComment,
      visibleReplyInput
    } = this.state;

    return (
      <Fragment>
        <VideoMain
          url={url}
          title={title}>
          <Fragment>
            <VideoStats
              views={views}
              likes={likes}
              dislikes={dislikes}
              onThumbLike={() => { this.handleThumbs('like') }}
              onThumbDislike={() => { this.handleThumbs('dislike') }}
              onShareModalOpen={this.handleShareModalOpen}
            />
            <Divider />
            <VideoInfo
              imageUrl={imageUrl}
              username={username}
              Posted={createdOn}
              description={description}
            />
            <Divider />
            <VideoComment
              imageUrl={imageUrl}
              comment={comment}
              comments={comments}
              onChangeComment={this.handleChangeComment}
              onResetComment={this.handleResetComment}
              onCreateComment={this.handleCreateComment}
              subComment={subComment}
              visibleReplyInput={visibleReplyInput}
              onVisibleReply={this.handleVisibleReply}
              onChangeSubComment={this.handleChangeSubComment}
              onResetSubComment={this.handleResetSubComment}
              onCreateSubComment={this.handleCreateSubComment}
            />
          </Fragment>
        </VideoMain>
        <ShareModal
          key='video-share-modal'
          innerRef={this.linkTextRef}
          title={title}
          open={shareDialogOpen}
          onEmbedModalOpen={this.handleEmbedModalOpen}
          onShareModalClose={this.handleShareModalClose}
          linkToShare={linkToShare}
          onCopy={() => { this.handleCopy('share') }}
        />
        <EmbedModal
          key='video-embed-modal'
          innerRef={this.iframeRef}
          open={embedDialogOpen}
          onEmbedModalClose={this.handleEmbedModalClose}
          url={url}
          onCopy={() => { this.handleCopy('embed') }}
        />
        <Snackbar
          key='video-copy-snackbar'
          open={copySnackbarOpen}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          autoHideDuration={8000}
          onClose={this.handleCopySnackbarClose}
          message={<span>Video link copied to clipboard</span>}
          action={<IconButton onClick={this.handleCopySnackbarClose} color='inherit'><CloseIcon /></IconButton>}
        />
      </Fragment>
    );
  }
};

const VIDEO_BY_ID = gql`
  query ($videoId: ID!) {
    getVideoById(videoId: $videoId) {
      title
      description
      url
      views
      likes
      dislikes
      createdOn
      owner {
        username
        imageUrl
      }
      comments {
        id,
        text
        reply
        likes
        dislikes
        createdOn
        postedBy {
          username
          imageUrl
        }
        subComments {
          text
          likes
          dislikes
          createdOn
          postedBy {
            username
            imageUrl
          }
        }
      }
    }
  }
`;

const ADD_VIEW = gql`
  mutation ($videoId: ID!) {
    addView(videoId: $videoId){
      views
    }
  }
`;

const ADD_LIKE = gql`
  mutation ($videoId: ID!) {
    addLike(videoId: $videoId) {
      likes
    }
  }
`;

const ADD_DISLIKE = gql`
  mutation ($videoId: ID!) {
    addDislike(videoId: $videoId) {
      dislikes
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation ($text: String!, $reply: Boolean!, $videoId: ID!) {
    createComment(text: $text, reply: $reply, videoId: $videoId) {
      id
    }
  }
`;

const CREATE_SUBCOMMENT = gql`
  mutation ($text: String!, $reply: Boolean!, $commentId: ID!) {
    createSubComment(text: $text, reply: $reply, commentId: $commentId) {
      id
    }
  }
`;

export default compose(
  graphql(ADD_VIEW, { name: 'addView' }),
  graphql(ADD_LIKE, { name: 'addLike' }),
  graphql(ADD_DISLIKE, { name: 'addDislike' }),
  graphql(CREATE_COMMENT, { name: 'createComment' }),
  graphql(CREATE_SUBCOMMENT, { name: 'createSubComment' }),
  graphql(VIDEO_BY_ID, { options: props => ({ variables: { videoId: props.match.params.videoId } }) })
)(Video);