import styled from 'styled-components';
import { AppBar } from '@material-ui/core';

const StyledAppBar = styled(AppBar)`
  position: sticky;
  top: 0;
  background-image: linear-gradient(30.21deg, #3e5ee7 3.36%, #4f70f5 105%);
  box-shadow: none;
  height: 108px;
  overflow: hidden;
`;

const TopWave = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  z-index: -1;
`;

const Circle = styled.div<{ position: 'top' | 'bottom' }>`
  position: absolute;
  bottom: ${({ position }) => (position === 'top' ? 'auto' : 0)};
  top: ${({ position }) => (position === 'bottom' ? 'auto' : 0)};
  left: 0;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: rgba(100, 132, 255, 0.2);
  transform: ${({ position }) => (position === 'top' ? 'translate(-50%, -10%)' : 'translate(-50%, 50%);')};
  z-index: -1;
`;

export { StyledAppBar, TopWave, Circle };
