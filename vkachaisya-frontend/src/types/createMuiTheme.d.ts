import * as createMuiTheme from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    fontSizes: number[];
    fontWeights: number[];
  }

  interface Theme {
    fontSizes: number[];
    fontWeights: number[];
  }
}
