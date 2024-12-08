import axios from 'axios';

const baseURL = 'http://localhost:3000/';

const apiManager = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiManager;
