import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const Grid = styled.div`
  padding: 20px;
  background-color: #fff;

  @media (min-width: 1280px) {
    display: grid;
    grid-template-columns: 25% 75%;
  }
`;

const UploadItemSidebar = styled.div`
  font-size: 12px;
  text-align: left;
`;

const Thumbnail = styled.div`
  margin-bottom: 20px;
  width: 220px;
  height: 120px;
  border: 1px solid #eee;
  background: #ddd;
  box-shadow: inset 0 0 1px 1px #aaa;
  background-image: ${props => props.isLoaded ? 
    `url(${props.posterUrl})` : ''};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

const UploadItemMain = styled.div`
  display: flex;
  flex-direction: column;
`;

const UploadStatebar = styled.div`
  margin-bottom: 30px;
  text-align: left;
`;

const Progressbar = styled(LinearProgress)`
  && {
    display: inline-block;
    width: 85%;
    height: 30px;
  }
`;

const PublishButton = styled(Button)`
  && {
    position: absolute;
    margin-left: 12px;
    height: 30px;
    line-height: 1;
  }
`;

const PosterUploadInputText = styled.label`
  color: #0000ee;
  text-decoration: underline;
  cursor: pointer;
`;

const PosterUploadInput = styled.input`
  visibility: hidden;
`;

const TextFieldStyled = styled(TextField)`
  && {
    color: #DDDDDD;
  }
`

const UploadDetails = ({
  id,
  posterUrl,
  progress,
  completed,
  title,
  description,
  onChange,
  onCreateVideo,
  posterRef,
  onChangePoster
}) => {
  return (
    <Grid>
      <UploadItemSidebar>
        <Thumbnail isLoaded={progress === 100} posterUrl={posterUrl}/>
        <div>
          <p>Upload Status: </p>
          <p>{progress === 100 ? 'Upload Complete!' : progress > 0 ? `Upload ${progress}% Complete` : null}</p>
          {progress === 100 && 
            <Fragment>
              <PosterUploadInputText htmlFor='posterInput'>Change Poster Image</PosterUploadInputText>
              <PosterUploadInput 
                ref={posterRef} 
                type='file'
                accept='image/*'
                id='posterInput'
                onChange={onChangePoster}
              />
            </Fragment>}
          {completed && <Link to={`/video/${id}`}>Watch Your Video</Link>}
        </div>
      </UploadItemSidebar>
      <UploadItemMain>
        <UploadStatebar>
          <Progressbar
            variant='determinate'
            value={progress}/>
          <PublishButton
            color='primary'
            onClick={onCreateVideo}
            disabled={progress < 100}>
            Publish
          </PublishButton>
        </UploadStatebar>
        <div>
          <TextFieldStyled
            label='Title'
            name='title'
            value={title}
            onChange={onChange}
            fullWidth
            margin='normal'/>
          <TextFieldStyled
            label='Description'
            name='description'
            value={description}
            onChange={onChange}
            multiline={true}
            rows={4}
            fullWidth
            margin='normal'/>
        </div>
      </UploadItemMain>  
    </Grid>
  )
}

UploadDetails.defaultProps = {
  id: '',
  posterUrl: '',
  progress: 0,
  completed: false,
  title: '',
  description: '',
  onChange: () => console.warn('onChange not defined'),
  onCreateVideo: () => console.warn('onCreateVideo not defined'),
  posterRef: null,
  onChangePoster: () => console.warn('onChangePoster not defined')
}

UploadDetails.propTypes = {
  id: PropTypes.string,
  posterUrl: PropTypes.string,
  progress: PropTypes.number,
  completed: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func,
  onCreateVideo: PropTypes.func,
  posterRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  onChangePoster: PropTypes.func
}

export default UploadDetails;