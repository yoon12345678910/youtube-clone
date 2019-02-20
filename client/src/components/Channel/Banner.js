import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';


const Wrapper = styled.div`
  display: inline-block;
  overflow: hidden;
  width: 100%;
  height: 33vh;
  background-color: lightgrey;
  background-image: ${props => props.bannerUrl ? `url('${props.bannerUrl}')` : ''};
  background-position: ${props => props.bannerPosition ? `50% ${props.bannerPosition}` : '50% 50%'};
  background-size: cover;
  outline: 0;
  cursor: pointer;
`;

const Banner = ({
  bannerUrl,
  bannerPosition,
  onDrop
}) => {
  return (
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
  )
}

Banner.defaultProps = {
  bannerUrl: '',
  bannerPosition: '',
  onDrop: () => console.warn('onDrop not defined')
}

Banner.propTypes = {
  bannerUrl: PropTypes.string,
  bannerPosition: PropTypes.string,
  onDrop: PropTypes.func
}

export default Banner;