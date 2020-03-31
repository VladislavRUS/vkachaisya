import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './entry';
import bridge from '@vkontakte/vk-bridge';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './configureStore';
import { ThemeProvider } from './theme';

const history = createHashHistory();

// @ts-ignore
const initialState = window.initialReduxState;

const store = configureStore(history, initialState);

bridge.send('VKWebAppInit');

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
