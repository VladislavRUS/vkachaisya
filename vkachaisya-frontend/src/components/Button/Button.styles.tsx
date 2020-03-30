import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const StyledButton = styled(({ loading, ...props }) => <Button {...props} />)`
  &.MuiButton-root {
    position: relative;
    border-radius: 10px;
    padding: 16px 32px;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    box-shadow: none;
    text-transform: none;
    min-width: 0;
  }
`;

export { StyledButton };
