import React from 'react';
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

const styles = {
  BUTTONS: {
    display: 'flex'
  },
  DIVIDER: {
    marginTop: '1vh',
    marginBottom: '1vh'
  },
  LINK: {
    cursor: 'pointer',
    marginRight: '1vh'
  }
}

export default ({ 
  open, 
  handleShareModalClose, 
  linkToShare, 
  onChange, 
  onCopy, 
  title,
  handleEmbedModalOpen
}) => (
  <Dialog
    open={open}
    onClose={handleShareModalClose}
    fullWidth
  >
    <DialogTitle>Share</DialogTitle>
    <DialogContent>
      <div style={styles.BUTTONS}>
        <FacebookShareButton url={linkToShare} style={styles.LINK}>
          <FacebookIcon />
        </FacebookShareButton>
        <TwitterShareButton url={linkToShare} title={title} style={styles.LINK}>
          <TwitterIcon />
        </TwitterShareButton>
        <GooglePlusShareButton url={linkToShare} style={styles.LINK}>
          <GooglePlusIcon />
        </GooglePlusShareButton>
        <RedditShareButton url={linkToShare} title={title} style={styles.LINK}>
          <RedditIcon />
        </RedditShareButton>
      </div>
      <Divider style={styles.DIVIDER} />
      <TextField
        id='link-text'
        disabled={true}
        value={linkToShare}
        fullWidth
      />
      <Divider style={styles.DIVIDER} />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleEmbedModalOpen}>Embed</Button>
      <Button onClick={onCopy}>Copy</Button>
    </DialogActions>
  </Dialog>
)