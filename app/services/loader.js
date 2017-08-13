import Ember from 'ember';

const { Service, getOwner, $: { ajax }, RSVP: { Promise: RSVPPromise } } = Ember;
const { stringify } = JSON;

export default Service.extend({

  makePromise(url, type, data = null, config = {}) {
    const adapter = getOwner(this).lookup('adapter:application');
    const options = !config.isExternal ? adapter.ajaxOptions() : {};
    options.type = type;

    if (config.isExternal) {
      options.url = url;
    } else {
      url = `${url[0] !== '/' ? '/' :  ''}${url}`;
      options.url = config.withoutPrefix ? `${adapter.host}${url}` : `${adapter.urlPrefix()}${url}`;
    }

    if (data) {
      if (config.isFormData) {
        options.data = data;
      } else {
        options.contentType = 'application/json';
        options.dataType = 'json';
        options.data = stringify(data);
      }
    }

    return new RSVPPromise((resolve, reject) => {
      ajax(options).then(
        data => {
          resolve(data);
        },
        jqXHR => {
          reject(`Could not make ${options.type} request to ${options.url}`);
          jqXHR.then = null;
        }
      );
    });
  },

  load(url, config = {}) {
    return this.makePromise(url, 'GET', null, config);
  },

  post(url, data = null, config = {}) {
    return this.makePromise(url, 'POST', data, config);
  },

  put(url, data = null, config = {}) {
    return this.makePromise(url, 'PUT', data, config);
  },

  delete(url, config = {}) {
    return this.makePromise(url, 'DELETE', null, config);
  }
});
