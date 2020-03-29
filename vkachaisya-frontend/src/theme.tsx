import React from 'react';
import { createMuiTheme, MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';

const COLORS = {};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#00ff00',
    },
    ...COLORS,
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: "'Roboto', Arial, 'sans-serif'",
    h1: {
      fontWeight: 700,
      fontSize: '24px',
    },
  },
  fontSizes: [],
  fontWeights: [],
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
