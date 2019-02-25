import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const Wrapper = styled.div`
  display: inline-block;
  overflow: hidden;
  width: 100%;
  height: 33vh;
  background-color: lightgrey;
  background-image: ${props => props.bannerUrl ? `url('${props.bannerUrl}')` : ''};
  background-position: ${props => `50% ${props.bannerPosition}`};
  background-size: cover;
  outline: 0;
  cursor: pointer;
`;

const DialogContentStyled = styled(DialogContent)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

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

const Banner = ({
  bannerUrl,
  bannerPosition,
  isShowUpload,
  isShowSettings,
  progress,
  onDrop,
  onUpload,
  onCloseUpload,
  onChangeSettings,
  onSaveSettings,
  onCloseSettings
}) => {
  return (
    <Fragment>
      <Dropzone
        accept='image/jpeg, image/png'
        multiple={false}
        onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => {
          return (
            <Wrapper 
              bannerUrl={bannerUrl}
              bannerPosition={bannerPosition}
              {...getRootProps()} >
              <input {...getInputProps()} />
            </Wrapper>
          );
        }}
      </Dropzone>
      <Dialog
        open={isShowUpload}
        onClose={onCloseUpload}
        fullWidth >
        <DialogTitle>Upload Channel Banner</DialogTitle>
        <DialogContentStyled>
          <CircularProgress variant='determinate' value={progress} />
        </DialogContentStyled>
        <DialogActions>
          <Button color='primary' onClick={onCloseUpload}>Cancel</Button>
          <Button color='primary' onClick={onUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isShowSettings}
        onClose={onCloseSettings}
        fullWidth >
        <DialogTitle>Banner Position</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>Banner Vertical Position</FormLabel>
            <RadioGroup
              value={bannerPosition}
              onChange={onChangeSettings}>
              {renderRadioButtons()}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseSettings}>Cancel</Button>
          <Button
            color='primary'
            onClick={onSaveSettings}>
            Set Position
          </Button>
        </DialogActions>
      </Dialog>
      
    </Fragment>
  )
}

Banner.defaultProps = {
  bannerUrl: '',
  bannerPosition: '',
  isShowUpload: false,
  isShowSettings: false,
  progress: 0,
  onDrop: () => console.warn('onDrop not defined'),
  onUpload: () => console.warn('onUpload not defined'),
  onCloseUpload: () => console.warn('onCloseUpload not defined'),
  onChangeSettings: () => console.warn('onChangeSettings not defined'),
  onSaveSettings: () => console.warn('onSaveSettings not defined'),
  onCloseSettings: () => console.warn('onCloseSettings not defined'),
}

Banner.propTypes = {
  bannerUrl: PropTypes.string,
  bannerPosition: PropTypes.string,
  isShowUpload: PropTypes.bool,
  isShowSettings: PropTypes.bool,
  progress: PropTypes.number,
  onDrop: PropTypes.func,
  onUpload: PropTypes.func,
  onCloseUpload: PropTypes.func,
  onChangeSettings: PropTypes.func,
  onSaveSettings: PropTypes.func,
  onCloseSettings: PropTypes.func
}

export default Banner;
