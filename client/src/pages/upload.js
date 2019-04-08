import React, { Component } from 'react';
import { withApollo, graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import axios from 'axios';

import Dropzone from '../components/upload/dropzone';
import Details from '../components/upload/details';
import { formatFilename } from '../utils';


const Container = styled.div`
  margin: 0 auto;
  width: auto;
  text-align: center;
  @media (min-width: 1280px) {
    width: 1050px;
  }
`;

class Upload extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      dropzone: true,
      completed: false,
      progress: 0,
      title: '',
      description: '',
      url: '',
      posterUrl: ''
    }

    this.videoRef= React.createRef();
    this.canvasRef = React.createRef();
    this.posterRef = React.createRef();
    this.handleDrop = this.handleDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleCreateVideo = this.handleCreateVideo.bind(this);
    this.handleChangePoster = this.handleChangePoster.bind(this);
  }

  handleDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    this.handleUpload(file);
  }

  handleUpload = async file => {
    const { title, uploadFileName } = formatFilename(file.name);
    const video = await this.s3SignVideo(uploadFileName, file.type);
    const poster = await this.s3SignPoster(uploadFileName);

    this.uploadToS3Poster(poster.requestUrl, video.s3BucketUrl);

    this.setState({
      dropzone: false,
      title,
      url: video.s3BucketUrl,
      posterUrl: poster.s3BucketUrl
    });

    this.uploadToS3Video(video.requestUrl, file);
  }

  handleCreateVideo = async () => {
    const { title, description, url, posterUrl } = this.state;
    const response = await this.props.createVideo({
      variables: { input: { title, description, url, posterUrl } }
    });
    console.log(response.data.createVideo.id)
    this.setState({
      id: response.data.createVideo.id,
      completed: true
    });
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleChangePoster = async e => {
    const file = e.target.files[0];
    const { uploadFileName } = formatFilename(file.name);
    const poster = await this.s3SignPoster(uploadFileName);
    console.log('poster', poster)

    this.uploadToS3Poster2(poster.requestUrl, file);
    this.setState({
      posterUrl: poster.s3BucketUrl
    });
  }

  s3SignVideo = async (name, type) => {
    const response = await this.props.s3SignVideo({
      variables: { 
        filename: `videos/${name}`,
        filetype: type
      }
    });
    const { requestUrl, s3BucketUrl } = response.data.s3SignVideo;
    return { requestUrl, s3BucketUrl };
  }

  uploadToS3Video = async (requestUrl, file) => {
    const options = {
      headers: { 'Content-Type': file.type },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        this.setState({ progress: percentCompleted });
      }
    };
    axios.put(requestUrl, file, options);
  }

  s3SignPoster = async (name) => {
    const response = await this.props.s3SignVideo({
      variables: { 
        filename: `images/${name}`,
        filetype: 'image/png' }
    });
    const { requestUrl, s3BucketUrl } = response.data.s3SignVideo;
    return { requestUrl, s3BucketUrl };
  }

  // 자동 캡쳐 Upload
  uploadToS3Poster = (requestUrl, videoUrl) => {
    const videoElement = this.videoRef.current;
    const canvasElement = this.canvasRef.current;
    const options = { headers: { 'Content-Type': 'image/png' } };
    let buf;
    
    videoElement.src = videoUrl;
    videoElement.addEventListener('loadeddata', () => {
      const ctx = canvasElement.getContext('2d');
      ctx.drawImage(videoElement, 0, 0, 240, 120);
      buf = new Buffer(canvasElement.toDataURL().replace(/^data:image\/\w+;base64,/, ''), 'base64');

      axios.put(requestUrl, buf, options);
    }, false);
  }

  // 수동 이미지 Upload
  uploadToS3Poster2 = (requestUrl, file) => {
    const options = { headers: { 'Content-Type': 'image/png' } };
    axios.put(requestUrl, file, options);
  }

  render() {
    const {
      id,
      dropzone,
      progress,
      completed,
      title,
      description,
      posterUrl
    } = this.state;

    return (
      <Container>
        {
        dropzone ? 
          <Dropzone
            canvasRef={this.canvasRef}
            videoRef={this.videoRef}
            onDrop={this.handleDrop}
          />
          :
          <Details
            id={id}
            progress={progress}
            completed={completed}
            title={title}
            description={description}
            posterUrl={posterUrl}
            onChange={this.handleChange}
            onCreateVideo={this.handleCreateVideo}
            posterRef={this.posterRef}
            onChangePoster={this.handleChangePoster}
          />
        }
      </Container>
    );
  }
};

const S3_SIGN_VIDEO = gql`
  mutation ($filename: String!, $filetype: String!) {
    s3SignVideo(filename: $filename, filetype: $filetype) {
      requestUrl
      s3BucketUrl
    }
  }
`;

const CREATE_VIDEO = gql`
  mutation ($input: VideoInput) {
    createVideo(input: $input) {
      id
    }
  }
`;

export default compose(
  withApollo,
  graphql(S3_SIGN_VIDEO, { name: 's3SignVideo' }),
  graphql(CREATE_VIDEO, { name: 'createVideo' })
)(Upload);