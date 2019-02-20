import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const positions = [
  { value: '0%', label: 'Top' },
  { value: '25%', label: 'Mid-Top' },
  { value: '50%', label: 'Middle' },
  { value: '75%', label: 'Mid-Bottom' },
  { value: '100%', label: 'Bottom' }
];

const renderRadioButtons = () => positions.map((p, i) => (
  <FormControlLabel key={i} value={p.value} control={<Radio/>} label={p.label}/>
));

const SettingsModal = ({
  open,
  bannerPosition,
  onSaveBannerPosition,
  onSetBannerPosition,
  onCloseSettingsModal
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCloseSettingsModal}
      fullWidth >
      <DialogTitle>Banner Position</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel>Banner Vertical Position</FormLabel>
          <RadioGroup
            value={bannerPosition}
            onChange={onSetBannerPosition}>
            {renderRadioButtons()}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseSettingsModal}>Cancel</Button>
        <Button
          color='primary'
          onClick={onSaveBannerPosition}>
          Set Position
        </Button>
      </DialogActions>
    </Dialog>
  )
}

SettingsModal.defaultProps = {
  open: false,
  bannerPosition: '',
  onSaveBannerPosition: () => console.warn('onSaveBannerPosition not defined'),
  onSetBannerPosition: () => console.warn('onSetBannerPosition not defined'),
  onCloseSettingsModal: () => console.warn('onCloseSettingsModal not defined')
}

SettingsModal.propTypes = {
  open: PropTypes.bool,
  bannerPosition: PropTypes.string,
  onSaveBannerPosition: PropTypes.func,
  onSetBannerPosition: PropTypes.func,
  onCloseSettingsModal: PropTypes.func
}

export default SettingsModal;