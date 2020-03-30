import React from 'react';
import { TextFieldProps } from '@material-ui/core';
import { StyledTextField } from './TextField.styles';

const TextField: React.FC<TextFieldProps> = (props) => <StyledTextField {...props}></StyledTextField>;

export { TextField };
