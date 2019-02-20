import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsDownIcon from '@material-ui/icons/ThumbDown';

import { timeDifferenceForDate } from '../utils';


const FlexRow = styled.div`
  display: flex;
  align-items: center;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1vh;
`;

const InputStyled = styled(Input)`
  && {
    margin-left: 15px;
    font-size: 13px;
  }
`;

const InputCommentRow = styled(FlexRow)`
  margin-top: 2vh;
`

const CommentStats = styled(FlexRow)`
  margin-left: 45px;
`

const IconButtonStyled = styled(IconButton)`
  margin-right: 3vh;
`;

const CommentWrapper = styled.div`
  margin-bottom: 20px;
`;

const SubCommentWrapper = styled.div`
  margin-left: 55px;
`

const AvatarStyledSm = styled(Avatar)`
  && {
    width: 4vh;
    height: 4vh;
  }
`;

const VideoComment = ({
  imageUrl,
  comment,
  comments,
  onChangeComment,
  onResetComment,
  onCreateComment,
  subComment,
  visibleReplyInput,
  onVisibleReply,
  onChangeSubComment,
  onResetSubComment,
  onCreateSubComment
}) => {
  return (
    <Fragment>
      <InputCommentRow>
        <Typography variant='subheading'>{comments.length} Comments</Typography>
        <Button>Sort By</Button>
      </InputCommentRow>
      <InputCommentRow>
        <Avatar src={imageUrl} alt='user' />
        <InputStyled
          fullWidth
          value={comment}
          onChange={onChangeComment}
          placeholder='Add a public comment...' />
      </InputCommentRow>
      <Actions>
        <Button onClick={onResetComment}>Cancel</Button>
        <Button
          disabled={!comment}
          color='primary'
          onClick={onCreateComment} >
          Comment
        </Button>
      </Actions>
      {comments && comments.map((c, i) => {
        return (
          <CommentWrapper key={`video-comment-${i}`}>
            <FlexRow>
              <Avatar src={c.postedBy.imageUrl} />
              <FlexCol>
                <FlexRow>
                  <Typography variant='body2'>{c.postedBy.username}</Typography>&nbsp;&nbsp;
                  <Typography variant='caption'>{timeDifferenceForDate(c.createdOn)}</Typography>
                </FlexRow>
                <Typography variant='subheading'>{c.text}</Typography>
              </FlexCol>
            </FlexRow>
            <CommentStats>
              <IconButtonStyled>
                <ThumbsUpIcon fontSize='small' />&nbsp;
                <Typography type='button'>{c.likes}</Typography>
              </IconButtonStyled>
              <IconButtonStyled>
                <ThumbsDownIcon fontSize='small' />&nbsp;
                <Typography type='button'>{c.dislikes}</Typography>
              </IconButtonStyled>
              <Button size='small' onClick={() => onVisibleReply(i)}>Reply</Button>
            </CommentStats>
            {visibleReplyInput === i ?
              <SubCommentWrapper>
                <FlexRow>
                  <AvatarStyledSm src={imageUrl} />
                  <InputStyled
                    fullWidth
                    value={subComment}
                    onChange={onChangeSubComment}
                    placeholder='Add a public reply...' />
                </FlexRow>
                <Actions>
                  <Button onClick={onResetSubComment}>Cancel</Button>
                  <Button
                    disabled={!subComment}
                    size='small'
                    color='primary'
                    onClick={() => onCreateSubComment(c.id)} >
                    Reply
                  </Button>
                </Actions>
              </SubCommentWrapper> : null}
              {c.subComments && c.subComments.map((sc, si) => {
                return (
                  <SubCommentWrapper key={`video-sub-comment-${i}-${si}`}>
                    <FlexRow>
                      <AvatarStyledSm src={sc.postedBy.imageUrl}/>
                      <FlexCol>
                        <FlexRow>
                          <Typography variant='body2'>{sc.postedBy.username}</Typography>&nbsp;&nbsp;
                          <Typography variant='caption'>{timeDifferenceForDate(sc.createdOn)}</Typography>
                        </FlexRow>
                        <Typography>{sc.text}</Typography>
                      </FlexCol>
                    </FlexRow>
                    <CommentStats>
                      <IconButtonStyled>
                        <ThumbsUpIcon fontSize='small' />&nbsp;
                        <Typography type='button'>{sc.likes}</Typography>
                      </IconButtonStyled>
                      <IconButtonStyled>
                        <ThumbsDownIcon fontSize='small' />&nbsp;
                        <Typography type='button'>{sc.dislikes}</Typography>
                      </IconButtonStyled>
                    </CommentStats>
                  </SubCommentWrapper>
                );
              })}
          </CommentWrapper>
        )
      })}
    </Fragment>
  )
}

VideoComment.defaultProps = {
  imageUrl: '',
  comment: '',
  comments: [],
  onChangeComment: () => console.warn('onChangeComment not defined'),
  onResetComment: () => console.warn('onResetComment not defined'),
  onCreateComment: () => console.warn('onCreateComment not defined'),
  subComment: '',
  visibleReplyInput: -1,
  onVisibleReply: () => console.warn('onVisibleReply not defined'),
  onChangeSubComment: () => console.warn('onChangeSubComment not defined'),
  onResetSubComment: () => console.warn('onResetSubComment not defined'),
  onCreateSubComment: () => console.warn('onCreateSubComment not defined'),
}

VideoComment.propTypes = {
  imageUrl: PropTypes.string,
  comment: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape({
    postedBy: PropTypes.shape({
      imageUrl: PropTypes.string,
      username: PropTypes.string
    }),
    postedOn: PropTypes.number,
    likes: PropTypes.number
  })),
  onChangeComment: PropTypes.func,
  onResetComment: PropTypes.func,
  onCreateComment: PropTypes.func,
  subComment: PropTypes.string,
  visibleReplyInput: PropTypes.number,
  onVisibleReply: PropTypes.func,
  onChangeSubComment: PropTypes.func,
  onResetSubComment: PropTypes.func,
  onCreateSubComment: PropTypes.func
}

export default VideoComment;