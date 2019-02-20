import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import axios from 'axios';

import UploadDropzone from '../components/UploadDropzone';
import UploadDetails from '../components/UploadDetails';
import { formatFilename } from '../utils';


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
    this.handleDrop = this.handleDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleCreateVideo = this.handleCreateVideo.bind(this);
  }

  handleDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    this.handleUpload(file);
  }

  handleUpload = async file => {
    const filename = formatFilename(file.name);
    const video = await this.s3SignVideo(filename, file.type);
    const poster = await this.s3SignPoster(filename);

    this.uploadToS3Poster(poster.requestUrl, video.s3BucketUrl);

    this.setState({
      dropzone: false,
      title: filename,
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

    this.setState({
      id: response.data.createVideo.id,
      completed: true
    });
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

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
      dropzone ? 
        <UploadDropzone
          canvasRef={this.canvasRef}
          videoRef={this.videoRef}
          onDrop={this.handleDrop} />
        :
        <UploadDetails
          id={id}
          progress={progress}
          completed={completed}
          title={title}
          description={description}
          posterUrl={posterUrl}
          onChange={this.handleChange}
          onCreateVideo={this.handleCreateVideo} />
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
  graphql(S3_SIGN_VIDEO, { name: 's3SignVideo' }),
  graphql(CREATE_VIDEO, { name: 'createVideo' })
)(Upload);