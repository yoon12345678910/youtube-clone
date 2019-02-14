import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';


const styles = {
  CONTAINER: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#F1F1F1'
  },
  DROPZONE: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    border: 'none',
    width: '95%',
    maxWidth: '743px',
    maxHeight: '385px',
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  IMAGE: {
    margin: '65px 0 20px',
    width: '118px',
    height: '80px'
  }
};

class Upload extends Component {
  onDrop = (acceptedFiles, rejectedFiles) => {
  }

  render(){
    return(
      <div style={styles.CONTAINER}>
        <Dropzone
          accept='video/webm'
          multiple={false}
          onDrop={this.onDrop}>
          {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <div 
              {...getRootProps()}
              style={styles.DROPZONE}
              className={classNames('dropzone', {'dropzone--isActive': isDragActive})}>
              <input {...getInputProps()} />
              <img src='//s.ytimg.com/yts/img/upload/large-upload-resting-icon-vflM6eC13.png' // //s.ytimg.com/yts/img/upload/large-upload-hover-icon-vflcwlQhZ.png
                alt='upload'
                style={styles.IMAGE}/>
              <Typography type='headline'>Select files to upload</Typography>
              <br/>
              <Typography>Or drag and drop video files</Typography>  
            </div>
            );
          }}
        </Dropzone>
      </div>
    );
  }
}

export default Upload;