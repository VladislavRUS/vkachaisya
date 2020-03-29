import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '../theme';
import Routes from '../screens';

const App = () => (
  <ThemeProvider>
    <Routes />
  </ThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
