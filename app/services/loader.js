import Ember from 'ember';

const { Service, getOwner, $: { ajax }, RSVP: { Promise: RSVPPromise } } = Ember;
const { stringify } = JSON;

export default Service.extend({

  makePromise(url, type, data = null) {
    const adapter = getOwner(this).lookup('adapter:application');
    const options = adapter.ajaxOptions();
    options.url = `${adapter.urlPrefix()}${url}`;
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

  get(url) {
    return this.makePromise(url, 'GET');
  },

  post(url, data = null) {
    return this.makePromise(url, 'POST', data);
  },

  put(url, data = null) {
    return this.makePromise(url, 'PUT', data);
  },

  delete(url) {
    return this.makePromise(url, 'DELETE');
  }
});
