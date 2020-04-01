import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const StyledButton = styled(({ iconName, iconRotate, size, buttonColor, ...props }) => <Button {...props} />)`
  &.MuiButton-root {
    display: block;
    position: relative;
    border-radius: 50%;
    width: ${(props) => `${props.size || 24}px`};
    height: ${(props) => `${props.size || 24}px`};
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    text-transform: none;
    min-width: 0;
    background-color: ${(props) => props.buttonColor || '#f0f1f3'};
    flex-shrink: 0;
  }

  & .MuiButton-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

export { StyledButton };
