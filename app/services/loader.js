import Ember from 'ember';

const { Service, getOwner, $: { ajax }, RSVP: { Promise: RSVPPromise } } = Ember;

export default Service.extend({

  get(url) {
    const adapter = getOwner(this).lookup('adapter:application');
    const options = adapter.ajaxOptions();
    options.url = `${adapter.urlPrefix()}${url}`;
    options.type = 'GET';
    return new RSVPPromise((resolve, reject) => {
      ajax(options).then(
        data => {
          resolve(data);
        }, jqXHR => {
        reject(`Could not retrieve data at ${options.url}`);
        jqXHR.then = null;
      });
    });
  },

  post(url, data) {
    const adapter = getOwner(this).lookup('adapter:application');
    const options = adapter.ajaxOptions();
    options.url = `${adapter.urlPrefix()}${url}`;
    options.type = 'POST';
    options.data = data;
    return new RSVPPromise((resolve, reject) => {
      ajax(options)
        .then(
          data => {
            resolve(data);
          }, jqXHR => {
            reject(`Could not post to ${options.url}`);
            jqXHR.then = null;
          });
    });
  },

  delete(url) {
    const adapter = getOwner(this).lookup('adapter:application');
    const options = adapter.ajaxOptions();
    options.url = `${adapter.urlPrefix()}${url}`;
    options.type = 'DELETE';

    return new RSVPPromise((resolve, reject) => {
      ajax(options)
        .then(
          data => {
            resolve(data);
          }, jqXHR => {
            reject(`Could not delete at ${options.url}`);
            jqXHR.then = null;
          });
    });
  }
});
