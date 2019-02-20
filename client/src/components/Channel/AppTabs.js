import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';


const AppBarStyled = styled(AppBar)`
  padding: 4vh 9vh 0;
`;

const Upper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
`;

const LeftStyled = styled(Left)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 40px;
`;

const AvatarStyled = styled(Avatar)`
  && {
    width: 80px;
    height: 80px;
  }
`;

const ButtonStyled = styled(Button)`
  && {
    margin: 0 3vh;
  }
`;

const Label = styled.span`
  font-size: .95rem;
`;

const SearchInput = styled(Input)`
  align-items: flex-end;
  margin-bottom: 1vh;
  color: #fff;
`;


const labels = ['Home', 'Videos', 'Playlists', 'Channels', 'Discussion', 'About'];
const TabLabels = () => {
  return labels.map((l, i) => {
    return (<Tab key={`tab-${i}`} label={<Label>{l}</Label>}/>);
  })
};

const AppTabs = ({
  tabIndex,
  username,
  imageUrl,
  searchMode,
  searchString,
  onTabs,
  onSearchMode,
  onSearchString,
  onOpenSettingsModal
}) => {
  return (
    <AppBarStyled position='static'>
      <Upper>
        <Left>
          <AvatarStyled src={imageUrl}/>
          <LeftStyled>
            <Typography variant='h5' color='inherit'>{username}</Typography>
          </LeftStyled>
        </Left>
        <div>
          <Button variant='contained'>Customize Channel</Button>
          <ButtonStyled variant='contained'>Creator Studio</ButtonStyled>
          <IconButton onClick={onOpenSettingsModal}>
            <SettingsIcon/>
          </IconButton>
        </div>
      </Upper>
      <Left>
        <Tabs value={tabIndex} onChange={onTabs}>
          {TabLabels()}
        </Tabs>
        <IconButton onClick={onSearchMode} color='inherit'><SearchIcon/></IconButton>
        { searchMode && 
          <SearchInput
            placeholder='Search'
            value={searchString}
            onChange={onSearchString} /> 
        }
      </Left>
    </AppBarStyled>
  )
}

AppTabs.defaultProps = {
  tabIndex: 0,
  username: '',
  imageUrl: '',
  searchMode: false,
  searchString: '',
  onTabs: () => console.warn('onTabs not defined'),
  onSearchMode: () => console.warn('onSearchMode not defined'),
  onSearchString: () => console.warn('onSearchString not defined'),
  onOpenSettingsModal: () => console.warn('onOpenSettingsModal not defined')
}

AppTabs.propTypes = {
  tabIndex: PropTypes.number,
  username: PropTypes.string,
  imageUrl: PropTypes.string,
  searchMode: PropTypes.bool,
  searchString: PropTypes.string,
  onTabs: PropTypes.func,
  onSearchMode: PropTypes.func,
  onSearchString: PropTypes.func,
  onOpenSettingsModal: PropTypes.func
}

export default AppTabs;