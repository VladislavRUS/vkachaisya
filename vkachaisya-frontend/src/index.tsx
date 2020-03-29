import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './entry';
import bridge from '@vkontakte/vk-bridge';
import { API_CLIENT } from './api';

bridge.send('VKWebAppInit');
API_CLIENT.defaults.headers['url'] = window.location.href;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
