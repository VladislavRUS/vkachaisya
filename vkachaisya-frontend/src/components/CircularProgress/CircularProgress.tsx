import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Box } from '@material-ui/core';

const CircularProgress: React.FC<{ value: number }> = ({ value }) => (
  <Box width="80px" height="80px">
    <CircularProgressbar
      value={value}
      text={`${value} %`}
      styles={{
        trail: {
          stroke: '#f3f3f3',
        },
        path: {
          stroke: 'url(#linear-gradient)',
        },
        text: {
          fontFamily: '"Lato", sans-serif',
          fill: '#403E4B',
          fontSize: '22px',
          fontWeight: 700,
        },
      }}
    />
    <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true" focusable="false">
      <linearGradient id="linear-gradient" x2="1" y2="1">
        <stop offset="0" stopColor="white" />
        <stop offset="100%" stopColor="#ffcd79" />
      </linearGradient>
    </svg>
  </Box>
);

export { CircularProgress };
