import styled from 'styled-components';
import { AppBar } from '@material-ui/core';

const StyledAppBar = styled(AppBar)`
  background-image: linear-gradient(30.21deg, #3e5ee7 3.36%, #4f70f5 105%);
  box-shadow: none;
  min-height: 100px;
  overflow: hidden;
`;

const TopWave = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  z-index: -1;
`;

const BottomLeftCircle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: rgba(100, 132, 255, 0.2);
  transform: translate(-50%, 50%);
  z-index: -1;
`;

export { StyledAppBar, TopWave, BottomLeftCircle };
