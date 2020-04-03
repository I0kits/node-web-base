import 'normalize.css';
import _ from 'lodash';
import FastClick from 'fastclick';

import { token } from './helper/current-user';

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', ()=> {
    FastClick.attach(document.body);
  }, false);
}

if(!window.Promise) {
  require('es6-promise').polyfill();
}

const addToken = (url, opts)=> {
  opts.credentials = 'omit';

  if (!_.startsWith(url, '/api/login') && _.isEmpty(opts.headers.Authorization)) {
    opts.headers.Authorization = `Bearer ${token()}`;
  }

  console.log('[request].%s with:', opts.method, opts);
  return { url, opts };
};

export const request = {
  timeout: 1000,
  requestInterceptors: [addToken],
};

export const dva = {
  hmr: true,
  immer: true,
};
