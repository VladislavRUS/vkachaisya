import React from 'react';
import { ButtonProps } from '@material-ui/core';
import { StyledButton } from './SquareButton.styles';
import { Icon } from '../Icon';

const SquareButton: React.FC<ButtonProps & { iconName: string }> = (props) => (
  <StyledButton {...props}>
    <Icon name={props.iconName} size={10} />
  </StyledButton>
);

export { SquareButton };
