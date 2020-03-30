import styled from 'styled-components';
import { Switch, FormControlLabel } from '@material-ui/core';

const StyledSwitch = styled(Switch)``;

const StyledControl = styled(FormControlLabel)`
  &.MuiFormControlLabel-labelPlacementStart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 0;
  }
`;

const StyledLabel = styled.div`
  color: ${({ theme }) => theme.palette.text.primary};
`;

export { StyledSwitch, StyledControl, StyledLabel };
