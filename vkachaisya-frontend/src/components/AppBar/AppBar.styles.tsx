import React from 'react';
import styled, { css } from 'styled-components';
import { PanelHeaderSimple } from '@vkontakte/vkui';
import { Box } from '@material-ui/core';

const StyledPanelHeader = styled(({ isTransparent, ...props }) => <PanelHeaderSimple {...props} />)<{
  isTransparent?: boolean;
}>`
  position: relative;
  background-image: ${({ isTransparent }) =>
    isTransparent ? 'none' : 'linear-gradient(30.21deg, #3e5ee7 3.36%, #4f70f5 105%)'};
  color: white;
  overflow: hidden;

  ${(props) =>
    props.isTransparent &&
    css`
      border-bottom: 1px solid #f5f5f5;

      &.MuiAppBar-colorPrimary {
        background: white;
      }
    `};
`;

const TopWave = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
`;

const Circle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: rgba(100, 132, 255, 0.2);
  transform: translate(-50%, 50%);
`;

const Content = styled(Box)`
  position: relative;
  z-index: 1;
`;

export { StyledPanelHeader, TopWave, Circle, Content };
