import React from 'react';
import { SwitchProps, SwitchClassKey, Switch as MuiSwitch } from '@material-ui/core';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { StyledSwitch, StyledControl, StyledLabel } from './Switch.styles';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = withStyles((theme: any) =>
  createStyles({
    root: {
      width: 50,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(24px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: theme.palette['greens:0'],
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      backgroundColor: 'rgba(120, 120, 128, 0.16)',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <MuiSwitch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const Switch: React.FC<SwitchProps & { label: string }> = ({ label, ...props }) => (
  <StyledControl
    control={<IOSSwitch {...props} color="primary" />}
    label={<StyledLabel>{label}</StyledLabel>}
    labelPlacement="start"
  />
);

export { Switch };
