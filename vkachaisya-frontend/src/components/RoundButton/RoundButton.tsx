import React from 'react';
import { ButtonProps } from '@material-ui/core';
import { StyledButton } from './RountButton.styles';

const RoundButton: React.FC<ButtonProps & { buttonColor?: string }> = (props) => (
  <StyledButton {...props} buttonColor={props.buttonColor}>
    {props.children}
  </StyledButton>
);

export { RoundButton };
