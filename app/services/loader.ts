import Service from '@ember/service';
import { getOwner } from '@ember/application';
import $ from 'jquery';
import { getErrorMessage } from 'open-event-frontend/utils/errors';
import { buildUrl } from 'open-event-frontend/utils/url';
import httpStatus from 'http-status';
import { serialize } from 'object-to-formdata';
import fetch from 'fetch';
import { clone, assign, merge, pick, isString } from 'lodash-es';

const bodyAllowedIn = ['PATCH', 'POST', 'PUT'];

interface Config {
  adapter?: any;
  isExternal?: boolean;
  data?: any;
  withoutPrefix?: boolean;
  replaceHeaders?: boolean;
  header?: string;
  headers?: string[];
  skipDataTransform?: boolean;
  isFormData?: boolean;
  isFile?: boolean;
  queryParams?: { [key:string]: any };
  authToken?: string;
  fileName?: string;
}

export default class Loader extends Service {

  defaultConfig = {
    data              : null,
    headers           : {},
    adapter           : 'adapter:application',
    isExternal        : false,
    isFormData        : false,
    isFile            : false,
    queryParams       : {},
    withoutPrefix     : false,
    replaceHeaders    : false,
    skipDataTransform : false
  }

  host(): string {
    return getOwner(this).lookup(this.defaultConfig.adapter).host;
  }

  getFetchOptions(url: string, method: string, data: any = null, config: Config = {}): { url: string, fetchOptions: { [key: string]: any } } {
    config = merge(clone(this.defaultConfig), config);

    const adapter = getOwner(this).lookup(config.adapter);
    const fetchOptions = !config.isExternal ? adapter.ajaxOptions() : {};

    data = data || config.data || null;

    if (!config.isExternal) {
      if (!url.startsWith('/')) {
        url = `/${url}`;
      }
      url = config.withoutPrefix ? `${adapter.host}${url}` : `${adapter.urlPrefix()}${url}`;
    }

    fetchOptions.headers = config.replaceHeaders ? config.header : merge(fetchOptions.headers, config.headers);
    fetchOptions.method = method;

    if (data) {
      if (bodyAllowedIn.includes(method)) {
        if (config.skipDataTransform) {
          fetchOptions.body = data;
        } else {
          if (config.isFormData) {
            fetchOptions.body = serialize(data);
          } else if (config.isFile) {
            delete fetchOptions.headers['Content-Type'];
            fetchOptions.body = data;
          } else if (url.includes('translation_channels')) {
            fetchOptions.headers['Content-Type'] = 'application/vnd.api+json';
            fetchOptions.body = JSON.stringify(data);
          } else {
            fetchOptions.headers['Content-Type'] = 'application/json';
            fetchOptions.body = JSON.stringify(data);
          }
        }
      } else {
        config.queryParams = config.queryParams || {};
        assign(config.queryParams, data);
      }
    }

    config.queryParams = config.queryParams || {};

    if (config.authToken) {
      fetchOptions.headers.Authorization = config.authToken;
    }

    url = buildUrl(url, config.queryParams, false);

    return {
      url, fetchOptions
    };
  }

  async makePromise(urlPath: string, method: string, data = null, config: Config = {}): Promise<any> {

    const { url, fetchOptions } = this.getFetchOptions(urlPath, method, data, config);

    const response = await fetch(url, fetchOptions);
    let parsedResponse = null;
    try {
      parsedResponse = await response.json();
    } catch (jsonFailure) {
      try {
        parsedResponse = await response.text();
      } catch (e) {
        console.warn('loader.parseFailed', response, e);
      }
    }

    if (!response.ok) {
      const defaultMessage = httpStatus[response.status];
      const errorResponse: any = pick(response, ['status', 'ok', 'statusText', 'headers', 'url']);
      errorResponse.statusText = defaultMessage;
      errorResponse.response = parsedResponse;
      errorResponse.errorMessage = isString(parsedResponse) ? parsedResponse
        : getErrorMessage(
          response.statusText,
          defaultMessage
            ? `${response.status} - ${defaultMessage}`
            : `Could not make ${fetchOptions.type} request to ${fetchOptions.url}`
        );
      throw errorResponse;
    }
    return parsedResponse;
  }

  load(url: string, config: Config = {}): Promise<any> {
    return this.makePromise(url, 'GET', null, config);
  }

  post(url: string, data = null, config: Config = {}): Promise<any> {
    return this.makePromise(url, 'POST', data, config);
  }

  put(url: string, data = null, config: Config = {}): Promise<any> {
    return this.makePromise(url, 'PUT', data, config);
  }

  patch(url: string, data = null, config = {}): Promise<any> {
    return this.makePromise(url, 'PATCH', data, config);
  }

  delete(url: string, config = {}): Promise<any> {
    return this.makePromise(url, 'DELETE', null, config);
  }

  uploadFile(urlPath: string, source: File | Blob | any, onProgressUpdate = null, config: Config = {}, method = 'POST'): Promise<any> {
    return new Promise((resolve, reject) => {
      if (
        !((window.File && source instanceof window.File)
          || (window.Blob && source instanceof window.Blob)
          || source.jquery
          || source.nodeType
          || ($(source).prop('tagName') === 'INPUT' && $(source).attr('type') === 'file'))
      ) {
        return reject('service:loader.uploadFile can only be used for an input, blob or File.');
      }

      if (source.jquery || source.nodeType) {
        const [{ files }] = $(source);
        if (files.length === 0) {
          return reject('no_files_selected');
        }
        if (!config.fileName) {
          config.fileName = $(source).attr('name');
        }
        source = files[0];
      }

      const formData = new FormData();
      if (config.fileName) {
        formData.append(config.fileName, source);
      }
      config.skipDataTransform = true;

      const { url, fetchOptions } = this.getFetchOptions(urlPath, method, formData, config);
      const xhr = new XMLHttpRequest();
      xhr.open(fetchOptions.method || 'get', url);
      const headers = fetchOptions.headers || {};
      for (const k in headers) {
        if (k !== 'Content-Type' && Object.prototype.hasOwnProperty.call(headers, k)) {
          xhr.setRequestHeader(k, fetchOptions.headers[k]);
        }
      }
      xhr.onload = (e: any) => resolve(e.target.responseText);
      xhr.onerror = reject;
      if (xhr.upload && onProgressUpdate) {xhr.upload.onprogress = onProgressUpdate}
      xhr.send(fetchOptions.body);
    });
  }

  downloadFile(urlPath: string,  onProgressUpdate = null, config: Config = {}, method = 'GET'): Promise<any> {
    return new Promise((resolve, reject) => {
      const { url, fetchOptions } = this.getFetchOptions(urlPath, method, null, config);
      const xhr = new XMLHttpRequest();

      xhr.responseType = 'blob';
      xhr.open('get', url);
      const headers = fetchOptions.headers || {};
      for (const k in headers) {
        if (k !== 'Content-Type' && Object.prototype.hasOwnProperty.call(headers, k)) {
          xhr.setRequestHeader(k, fetchOptions.headers[k]);
        }
      }
      xhr.onload =  (e: any) => {
        if (e.target.response) {
          resolve(e.target.response);
        } else {
          reject('Failed to download file.');
        }
      };
      xhr.onerror = reject;
      if (onProgressUpdate) {xhr.onprogress = onProgressUpdate}
      xhr.send(null);
    });
  }

  downloadFileWithPost(urlPath: string,  data = null, config: Config = {}, method = 'POST'): Promise<any> {
    return new Promise((resolve, reject) => {
      const { url, fetchOptions } = this.getFetchOptions(urlPath, method, data, config);
      const xhr = new XMLHttpRequest();

      xhr.responseType = 'blob';
      xhr.open(method, url);
      const headers = fetchOptions.headers || {};
      for (const k in headers) {
        xhr.setRequestHeader(k, fetchOptions.headers[k]);
      }
      xhr.send(fetchOptions.body)
      xhr.onload =  (e: any) => {
        if (e.target.response) {
          resolve(e.target.response);
        } else {
          reject('Failed to download file.');
        }
      };
      xhr.onerror = reject;
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'loader': Loader;
  }
}
