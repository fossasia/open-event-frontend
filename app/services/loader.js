import Ember from 'ember';

const { Service, getOwner, $: { ajax }, RSVP: { Promise: RSVPPromise } } = Ember;
const { stringify } = JSON;

export default Service.extend({

  makePromise(url, type, data = null, autoPrefix = true) {
    const adapter = getOwner(this).lookup('adapter:application');
    const options = adapter.ajaxOptions();
    options.url = autoPrefix ? `${adapter.urlPrefix()}${url}` : url;
    options.type = type;

    if (data) {
      options.contentType = 'application/json';
      options.dataType = 'json';
      options.data = stringify(data);
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

  get(url, autoPrefix = true) {
    return this.makePromise(url, 'GET', null, autoPrefix);
  },

  post(url, data = null, autoPrefix = true) {
    return this.makePromise(url, 'POST', data, autoPrefix);
  },

  put(url, data = null, autoPrefix = true) {
    return this.makePromise(url, 'PUT', data, autoPrefix);
  },

  delete(url, autoPrefix = true) {
    return this.makePromise(url, 'DELETE', null, autoPrefix);
  }
});
