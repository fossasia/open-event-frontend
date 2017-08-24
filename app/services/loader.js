import Ember from 'ember';

const { Service, getOwner, $, $: { ajax }, RSVP: { Promise: RSVPPromise } } = Ember;
const { stringify } = JSON;

export default Service.extend({

  getOptions(url, config) {
    const adapter = getOwner(this).lookup('adapter:application');
    const options = !config.isExternal ? adapter.ajaxOptions() : {};
    if (config.isExternal) {
      options.url = url;
    } else {
      url = `${url[0] !== '/' ? '/' :  ''}${url}`;
      options.url = config.withoutPrefix ? `${adapter.host}${url}` : `${adapter.urlPrefix()}${url}`;
    }
    return options;
  },

  makePromise(url, type, data = null, config = {}) {
    return new RSVPPromise((resolve, reject) => {
      const options = this.getOptions(url, config);
      options.type = type;
      if (data) {
        if (config.isFormData) {
          options.data = data;
        } else {
          options.contentType = 'application/json';
          options.dataType = 'json';
          options.data = stringify(data);
        }
      }

      ajax(options).then(
        data => {
          resolve(data);
        },
        jqXHR => {
          reject(jqXHR.responseJSON ? jqXHR.responseJSON : jqXHR.responseText ? jqXHR.responseText : `Could not make ${options.type} request to ${options.url}`);
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
  },

  uploadFile(url, source, onProgressUpdate = null, config = {}) {
    return new RSVPPromise((resolve, reject) => {

      if (
        !((window.File && source instanceof window.File)
        || (window.Blob && source instanceof window.Blob)
        || source.jquery
        || source.nodeType
        || ($(source).prop('tagName') === 'INPUT' && $(source).attr('type') === 'file'))
      ) {
        throw new Error('loader.uploadFile can only be used for an input, blob or File.');
      }

      if (source.jquery || source.nodeType) {
        const [{ files }] = $(source);
        if (files.length === 0) {
          reject('no_files_selected');
          return;
        }
        if (!config.fileName) {
          config.fileName = $(source).attr('name');
        }
        source = files[0];
      }

      const options = this.getOptions(url, config);

      const formData = new FormData();
      formData.append(config.fileName, source);

      options.data = formData;
      options.type = 'POST';
      options.cache = false;
      options.contentType = false;
      options.processData = false;

      options.xhr = () => {
        const xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener('progress', event => {
          if (event.lengthComputable) {
            const percentComplete = event.loaded / event.total;
            if (onProgressUpdate) {
              onProgressUpdate(percentComplete);
            }
          }
        }, false);
        return xhr;
      };
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
  }
});
