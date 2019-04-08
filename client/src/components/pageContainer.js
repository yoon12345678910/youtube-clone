import React from 'react';
import styled from 'styled-components';
import { drawerWidth } from './drawerMenu';


const Wrapper = styled.div`
  flex-grow: 1;
  margin-top: 64px;
  margin-left: -${drawerWidth};
  width: 100%;
  min-height: calc(100vh - 64px);
  background-color: #282828;
`;

const InnerWrapper = styled.div`
  margin: 0 auto;
  width: auto;
  text-align: center;
  @media (min-width: 1280px) {
    width: 850px;
  }
`;

const PageContainer = ({
  children
}) => {
  return (
    <Wrapper>
      <InnerWrapper>
        { children }
      </InnerWrapper>
    </Wrapper>
  );
}

export default PageContainer;