import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const StyledButton = styled(({ iconName, iconRotate, size, ...props }) => <Button {...props} />)`
  &.MuiButton-root {
    position: relative;
    border-radius: ${({ size }) => (size === 'large' ? '13px' : '10px')};
    padding: ${({ size }) => (size === 'large' ? '11px' : '10px')};
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    box-shadow: ${({ size }) => (size === 'large' ? '0 0 0 8px rgba(255,205,121,.2)' : 'none')};
    text-transform: none;
    min-width: 0;
    background-color: ${({ theme }) => theme.palette['yellows:0']};
  }
`;

export { StyledButton };
