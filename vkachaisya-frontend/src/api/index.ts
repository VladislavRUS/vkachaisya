import axios from 'axios';

const API_CLIENT = axios.create();
API_CLIENT.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export { API_CLIENT };
