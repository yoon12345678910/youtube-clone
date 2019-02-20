import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';


const DialogContentStyled = styled(DialogContent)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Modal = ({
  open,
  progress,
  onModalClose,
  onCancelUpload,
  onUploadBanner
}) => {
  return (
    <Dialog
      open={open}
      onClose={onModalClose}
      fullWidth >
      <DialogTitle>Upload Channel Banner</DialogTitle>
      <DialogContentStyled>
        <CircularProgress variant='determinate' value={progress} />
      </DialogContentStyled>
      <DialogActions>
        <Button color='primary' onClick={onCancelUpload}>Cancel</Button>
        <Button color='primary' onClick={onUploadBanner}>Upload</Button>
      </DialogActions>
    </Dialog>
  )
}

Modal.defaultProps = {
  open: false,
  progress: 0,
  onModalClose: () => console.warn('onModalClose not defined'),
  onCancelUpload: () => console.warn('onCancelUpload not defined'),
  onUploadBanner: () => console.warn('onUploadBanner not defined')
}

Modal.propTypes = {
  open: PropTypes.bool,
  progress: PropTypes.number,
  onModalClose: PropTypes.func,
  onCancelUpload: PropTypes.func,
  onUploadBanner: PropTypes.func
}

export default Modal;