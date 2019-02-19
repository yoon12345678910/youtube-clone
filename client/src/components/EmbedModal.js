import React from 'react';
import PropTypes from 'prop-types';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const EmbedModal = ({
  url,
  open, 
  onEmbedModalClose, 
  onCopy
}) => {
  const iframeText = `<iframe src=${url} width='560' height='315' frameborder='0' allowfullscreen></iframe>`;

  return (
    <Dialog
      open={open}
      onClose={onEmbedModalClose}
      fullWidth>
      <DialogTitle>Embed</DialogTitle>
      <DialogContent>
        <TextField
          disabled={true}
          value={iframeText}
          multiline
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <CopyToClipboard text={iframeText} onCopy={onCopy}>
          <Button>Copy</Button>
        </CopyToClipboard>
      </DialogActions>
    </Dialog>
  );
}

EmbedModal.defaultProps = {
  url: '',
  open: () => false,
  onEmbedModalClose: () => console.warn('onEmbedModalClose not defined'),
  onCopy: () => console.warn('onCopy not defined')
}

EmbedModal.propTypes = {
  url: PropTypes.string,
  open: PropTypes.bool,
  onEmbedModalClose: PropTypes.func,
  onCopy: PropTypes.func
}

export default EmbedModal;