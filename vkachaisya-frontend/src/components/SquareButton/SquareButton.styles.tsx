import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@material-ui/core';

const StyledButton = styled(({ iconName, iconRotate, size, color, ...props }) => <Button {...props} />)`
  &.MuiButton-root {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({ size }) => (size === 'large' ? '13px' : '10px')};
    padding: ${({ size, width }) => !width && (size === 'large' ? '11px' : '10px')};
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    box-shadow: ${({ size }) => (size === 'large' ? '0 0 0 8px rgba(255,205,121,.2)' : 'none')};
    text-transform: none;
    min-width: 0;
    flex-shrink: 0;

    ${css`
      background-color: ${({ theme, color }: any) => {
        switch (color) {
          case 'success':
            return theme.palette['greens:0'];
          case 'error':
            return theme.palette['reds:0'];
          case 'default':
            return '#f7f9fb';
          default:
            return theme.palette['yellows:0'];
        }
      }};
    `};
  }
  svg {
    color: white;
  }
`;

export { StyledButton };
