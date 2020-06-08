import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import { clearSession } from 'actions/auth';
import { store } from 'store';

const httpClient = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { accept: 'application/json' },
    params: {},
  })
);

httpClient.interceptors.request.use((config) => {
  const { guestLocale, session } = store.getState().auth;

  if (session) {
    Object.assign(config.headers, session);
  } else {
    // Waiting for https://github.com/axios/axios/issues/2190
    /* eslint-disable no-param-reassign */
    config.params = config.params || {};
    Object.assign(config.params, { locale: guestLocale });
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({ errors: ['Connection error'] });
    }

    if (error.response.status === 401) {
      store.dispatch(clearSession());
    }

    return Promise.reject(error.response.data);
  }
);

export default httpClient;
