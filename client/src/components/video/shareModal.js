import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  RedditShareButton,
  FacebookIcon,
  GooglePlusIcon,
  TwitterIcon,
  RedditIcon
} from 'react-share';


const link = () => `
  cursor: pointer;
  margin-right: 1vh;
`;

const DialogContentButtons = styled.div`
  display: flex;
`;

const DividerStyled = styled(Divider)`
  margin-top: 1vh;
  margin-bottom: 1vh;
`;

const FacebookShareButtonStyled = styled(FacebookShareButton)`
  ${link};
`;

const TwitterShareButtonStyled = styled(TwitterShareButton)`
  ${link};
`;

const GooglePlusShareButtonStyled = styled(GooglePlusShareButton)`
  ${link};
`;

const RedditShareButtonStyled = styled(RedditShareButton)`
  ${link};
`;

 const ShareModal = ({
  linkToShare,
  title,
  open, 
  onCopy, 
  onEmbedModalOpen,
  onShareModalClose 
}) => {
  return (
    <Dialog
      open={open}
      onClose={onShareModalClose}
      fullWidth>
      <DialogTitle>Share</DialogTitle>
      <DialogContent>
        <DialogContentButtons>
          <FacebookShareButtonStyled url={linkToShare}>
            <FacebookIcon />
          </FacebookShareButtonStyled>
          <TwitterShareButtonStyled url={linkToShare} title={title}>
            <TwitterIcon />
          </TwitterShareButtonStyled>
          <GooglePlusShareButtonStyled url={linkToShare}>
            <GooglePlusIcon />
          </GooglePlusShareButtonStyled>
          <RedditShareButtonStyled url={linkToShare} title={title}>
            <RedditIcon />
          </RedditShareButtonStyled>
        </DialogContentButtons>
        <DividerStyled />
        <TextField
          disabled={true}
          value={linkToShare}
          fullWidth />
        <DividerStyled />
      </DialogContent>
      <DialogActions>
        <Button onClick={onEmbedModalOpen}>Embed</Button>
        <CopyToClipboard text={linkToShare} onCopy={onCopy}>
          <Button>Copy</Button>
        </CopyToClipboard>
      </DialogActions>
    </Dialog>
  );
}

ShareModal.defaultProps = {
  linkToShare: '',
  title: '',
  open: false,
  onCopy: () => console.warn('onCopy not defined'),
  onEmbedModalOpen: () => console.warn('onEmbedModalOpen not defined'),
  onShareModalClose: () => console.warn('onShareModalClose not defined')
}

ShareModal.propTypes = {
  linkToShare: PropTypes.string,
  title: PropTypes.string,
  onOpen: PropTypes.bool,
  onCopy: PropTypes.func,
  onEmbedModalOpen: PropTypes.func,
  onShareModalClose: PropTypes.func
}

export default ShareModal;