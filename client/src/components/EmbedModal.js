import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default ({ 
  open, 
  handleEmbedModalClose, 
  onCopy, 
  url 
}) => (
    <Dialog
      open={open}
      onClose={handleEmbedModalClose}
      fullWidth
    >
    <DialogTitle>Embed</DialogTitle>
    <DialogContent>
      <TextField
        id='iframe-text'
        disabled={true}
        value={`<iframe src=${url} width="560" height="315" frameborder="0" allowfullscreen></iframe>`}
        multiline
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onCopy}>Copy</Button>
    </DialogActions>
  </Dialog>
)