import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const StyledButton = styled(({ iconName, ...props }) => <Button {...props} />)`
  &.MuiButton-root {
    position: relative;
    border-radius: 10px;
    padding: 10px;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    box-shadow: none;
    text-transform: none;
    min-width: 0;
    background-color: ${({ theme }) => theme.palette['yellows:0']};
  }
`;

export { StyledButton };
