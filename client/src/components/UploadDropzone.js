import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Typography from '@material-ui/core/Typography';


const UploadImage = styled.div`
  margin: 0 auto 15px;
  width: 118px;
  height: 80px;
  background-image: url('//s.ytimg.com/yts/img/upload/large-upload-resting-icon-vflM6eC13.png');
`;

const Wrapper = styled.div`
  display: inline-block;
  margin: 65px 0 20px;
  text-align: center;
  outline: 0;
  cursor: pointer;
  :hover ${UploadImage} {
    background-image: url('//s.ytimg.com/yts/img/upload/large-upload-hover-icon-vflcwlQhZ.png'); 
  }
`;

const displayNone = {
  display: 'none'
};

const UploadDropzone = ({
  canvasRef,
  videoRef,
  onDrop
}) => {
  return (
    <Fragment>
      <Dropzone
        accept='video/*'
        onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => {
          return (
            <Wrapper {...getRootProps()} >
              <input {...getInputProps()} />
              <UploadImage alt='upload'/>
              <Typography
                component='h2' 
                variant='headline'>
                Select files to upload
              </Typography>
              <br />
              <Typography variant='subheading'>
                Or drag and drop video files
              </Typography>
            </Wrapper>
          );
        }}
      </Dropzone>
      <canvas 
        ref={canvasRef}
        width={240}
        height={120}
        style={displayNone} />
      <video
        ref={videoRef}
        type='video/mp4'
        width={240}
        height={120}
        crossOrigin='Anonymous'
        style={displayNone} />
    </Fragment>
  )
}

UploadDropzone.defaultProps = {
  canvasRef: null,
  videoRef: null,
  onDrop: () => console.warn('onDrop not defined')
}

UploadDropzone.propTypes = {
  canvasRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  videoRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  onDrop: PropTypes.func
}

export default UploadDropzone;