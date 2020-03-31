import axios from 'axios';

const API_CLIENT = axios.create();

API_CLIENT.defaults.baseURL = process.env.REACT_APP_BASE_URL;

API_CLIENT.defaults.headers['url'] =
  process.env.NODE_ENV === 'development' ? process.env.REACT_APP_MOCK_URL : window.location.href;

export { API_CLIENT };