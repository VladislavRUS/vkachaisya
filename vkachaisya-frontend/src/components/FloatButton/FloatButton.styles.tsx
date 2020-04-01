import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@material-ui/core';

const StyledButton = styled(({ iconName, iconRotate, size, color, ...props }) => <Button {...props} />)`
  &.MuiButton-root {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 17px;
    background-color: #4868EF;
    width: 50px;
    height: 50px;
    box-shadow: none;
    flex: 0;
    padding: 0;
    min-width: 50px;
`;

export { StyledButton };
