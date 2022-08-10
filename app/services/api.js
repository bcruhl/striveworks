import axios from 'axios';
import cookie from 'cookie';
import ApiHeaders from './apiHeaders';

export default class Api {
  constructor(getState, fetchBackend = axios) {
    this.fetch = fetchBackend;
    this.getState = getState;
    this.headers = new ApiHeaders();
  }

  getAuthHeader = () => {
    try {
      return cookie.parse(document.cookie)['AppCookie'];
    } catch (e) {
      // TODO: Redirect to login
      throw new Error('Session cookie could not be obtained from the browser');
    }
  };

  getBaseUrl = () => {
    let _host = process.env.API_HOST;
    if (_host) {
      return _host;
    }

    return '';
  };

  getHeaders = () => ({
    authHeader: this.getAuthHeader(),
    ...this.headers.toDictionary(),
  });

  _mergeHeaders(requestHeaders) {
    const headersToRemove = Object.keys(requestHeaders).filter(
      headerKey => requestHeaders[headerKey] === undefined,
    );

    const headers = { ...this.getHeaders(), ...requestHeaders };

    headersToRemove.forEach(headerKey => {
      delete headers[headerKey];
    });

    return headers;
  }

  __options(method, body = undefined, requestHeaders = {}) {
    const headers = this._mergeHeaders(requestHeaders);
    const options = { method, headers };

    if (body !== undefined) {
      if (headers['Content-Type'] === 'application/json') {
        options.data = JSON.stringify(body);
      } else {
        options.data = body;
      }
    }

    return options;
  }

  __request(method, url, body = undefined, headers = {}) {
    const isRelativePath = url.charAt(0) === '/';

    return this.fetch({
      url: isRelativePath ? this.getBaseUrl() + url : url,
      ...this.__options(method, body, headers),
    }).then(response => {
      return response.data;
    });
  }

  get(url, headers = {}) {
    return this.__request('GET', url, undefined, headers);
  }

  post(url, body = undefined, headers = {}) {
    return this.__request('POST', url, body, headers);
  }

  patch(url, body = undefined, headers = {}) {
    return this.__request('PATCH', url, body, headers);
  }

  put(url, body = undefined, headers = {}) {
    return this.__request('PUT', url, body, headers);
  }

  delete(url, body = undefined, headers = {}) {
    return this.__request('DELETE', url, body, headers);
  }
}
