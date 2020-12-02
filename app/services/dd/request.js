import axios from 'axios';

import conf from '../../config';

const instance = axios.create({
  timeout: 30000,
  baseURL: conf.dd_api_url_base,
});

instance.interceptors.request.use((cfg) => {
  console.log('send Request with:', cfg);

  // TODO: Add content-type for JSON
  return cfg;
}, (err) => {
  console.log('send Request error:', err);
  return Promise.reject(err);
});

instance.interceptors.response.use((resp) => {
  console.log('Got Response:', resp);
  return resp;
}, (err) => {
  console.log('Parser Response error:', err);
  return Promise.reject(err);
});

export default instance;
