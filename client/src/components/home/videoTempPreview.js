import React from 'react';
import styled from 'styled-components';


const _tempStyled = () => `
  border-radius: 4px;
  background-color: #2d3436;
`;

const Poster = styled.div`
  ${_tempStyled};
  width: 300px;
  height: 180px;
`;

const Title = styled.div`
  ${_tempStyled};
  margin-top: 5px;
  height: 20px;
`;

const CreatedOn = styled.div`
  ${_tempStyled};
  margin-top: 5px;
  width: 35px;
  height: 20px;
`;

const VideoTempPreview = () => {
  return (
    <div>
      <Poster />
      <Title />
      <CreatedOn />
    </div>
  );
}

export default VideoTempPreview;