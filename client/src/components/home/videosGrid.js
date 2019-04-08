import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  gap: 50px 20px;
  margin: 50px 0;
`;

const VideosGrid = ({
  children
}) => {
  return (
    <Container>
      { children }
    </Container>
  );
}


export default VideosGrid;