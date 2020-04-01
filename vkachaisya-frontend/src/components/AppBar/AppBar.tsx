import React from 'react';
import { Box, Grid, AppBarProps as MuiAppBarProps } from '@material-ui/core';
import { StyledPanelHeader, TopWave, Circle, Content } from './AppBar.styles';
import WaveImage from '../../assets/images/top-wave.svg';
import { Typography } from '../Typography';

interface AppBarProps extends MuiAppBarProps {
  isTransparent?: boolean;
  left?: any;
  right?: any;
  center?: string;
}

const AppBar: React.FC<AppBarProps> = ({ ...props }) => (
  <StyledPanelHeader>
    {!props.isTransparent && (
      <>
        <TopWave src={WaveImage} />
        <Circle />
      </>
    )}
    <Content display="flex" alignItems="center" p={1} pr="19px" width="100%" height="100%">
      <Box width="50px" flexShrink={0}>
        {props.left}
      </Box>
      <Box display="flex" justifyContent="center" flexGrow="1" overflow="hidden">
        <Typography variant="h1" noWrap={true}>
          {props.center}
        </Typography>
      </Box>
      <Box width="50px" flexShrink={0} />
    </Content>
  </StyledPanelHeader>
);

// (
//   <StyledAppBar {...props} position="sticky">
//     {!props.isTransparent && (
//       <>
//         <TopWave src={WaveImage} />
//         <Circle position={circlePosition} />
//       </>
//     )}

//     {props.children}
//   </StyledAppBar>
// );

// AppBar = (props) => (
//   // <AppBar {...props} circlePosition="bottom">
//   //   <Box display="flex" alignItems="center" p={1} pr="19px" width="100%" height="100%">
//   //     <Box width="50px" flexShrink={0}>
//   //       {props.left}
//   //     </Box>
//   //     <Box display="flex" justifyContent="center" flexGrow="1" overflow="hidden">
//   //       <Typography variant="h1" noWrap={true}>
//   //         {props.center}
//   //       </Typography>
//   //     </Box>
//   //     <Box width="50px" flexShrink={0} />
//   //   </Box>
//   // </AppBar>
// );
// AppBar.Large = (props) => (
//   <AppBar {...props} circlePosition="top">
//     <Box p={1}>{props.left}</Box>
//     <Box display="flex" flexDirection="column" justifyContent="center" px="21px" pb="33px" width="100%" height="100%">
//       <Grid container alignItems="center">
//         <Grid container item xs={10} justify="center">
//           {props.center}
//         </Grid>
//         <Grid container item xs={2} justify="flex-end"></Grid>
//       </Grid>
//     </Box>
//   </AppBar>
// );

export { AppBar };
