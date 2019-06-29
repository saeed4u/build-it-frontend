import axios from 'axios'

const baseDomain = 'c';
const baseURL = `${baseDomain}/`;

const ax = axios.create({
  baseURL
});

ax.interceptors.request.use(config => {
  if (localStorage.getItem('loggedIn') === 'true') {
    const token = localStorage.getItem('authorization');
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});

export default ax;
