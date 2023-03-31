import axios from 'axios';

const API_URL = 'https://strapi.cleverland.by/api';
const API_AUTH_URL = 'https://strapi.cleverland.by/api/auth';

export const $auth = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

export const $host = axios.create({
  baseURL: API_AUTH_URL
})

$auth.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token') || '{}')}`;
  return config;
});

