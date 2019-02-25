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

const BannerSettingsModal = ({
  open,
  bannerPosition,
  onSave,
  onChange,
  onClose
}) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth >
      <DialogTitle>Banner Position</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel>Banner Vertical Position</FormLabel>
          <RadioGroup
            value={bannerPosition}
            onChange={onChange}>
            {renderRadioButtons()}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color='primary'
          onClick={onSave}>
          Set Position
        </Button>
      </DialogActions>
    </Dialog>
  )
}

BannerSettingsModal.defaultProps = {
  open: false,
  bannerPosition: '',
  onSave: () => console.warn('onSave not defined'),
  onChange: () => console.warn('onChange not defined'),
  onClose: () => console.warn('onClose not defined')
}

BannerSettingsModal.propTypes = {
  open: PropTypes.bool,
  bannerPosition: PropTypes.string,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func
}

export default BannerSettingsModal;