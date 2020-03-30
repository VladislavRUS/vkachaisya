import React from 'react';
import { createMuiTheme, MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';

const COLORS = {
  'blues:0': '#4F70F5',
  'blues:1': '#4969F0',
  'blues:2': '#E7EBFB',

  'yellows:0': '#FFCD79',

  'greens:0': '#56CC95',

  'grays:0': '#f8f9fc',
};

const theme = createMuiTheme({
  palette: {
    common: {
      white: '#FFFFFF',
    },
    primary: {
      main: '#4F70F5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E7EBFB',
      contrastText: '#4F70F5',
    },
    ...COLORS,
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: "'Lato', sans-serif",
    h1: {
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
  },
});

const GlobalStyle = createGlobalStyle`
  body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
  html,
  body {
    height: 100%;
  }
  
  #root {
    height: 100%;
  }
  * {
    box-sizing: border-box;
  }
`;

const ThemeProvider: React.FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </StylesProvider>
  </MuiThemeProvider>
);

export { theme, ThemeProvider, COLORS };
