import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import ENV from 'open-event-frontend/config/environment';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import HasManyQueryAdapterMixin from 'ember-data-has-many-query/mixins/rest-adapter';
import FastbootAdapter from 'ember-data-storefront/mixins/fastboot-adapter';

/**
 * The backend server expects the filter in a serialized string format.
 *
 * @param query
 * @return {*}
 */
export const fixFilterQuery = query  => {
  if (Object.prototype.hasOwnProperty.call(query, 'filter')) {
    query.filter = JSON.stringify(query.filter);
  }

  return query;
};

export default JSONAPIAdapter.extend(HasManyQueryAdapterMixin, FastbootAdapter, {
  host      : ENV.APP.apiHost,
  namespace : ENV.APP.apiNamespace,

  notify  : service(),
  session : service(),
  l10n    : service(),

  headers: computed('session.data.authenticated', function() {
    const headers = {
      'Content-Type': 'application/vnd.api+json'
    };
    const { access_token } = this.session.data.authenticated;
    if (access_token) {
      headers[ENV['ember-simple-auth-token'].authorizationHeaderName] = ENV['ember-simple-auth-token'].authorizationPrefix + access_token;
    }

    return headers;
  }),

  isInvalid(statusCode) {
    if (statusCode !== 404 && statusCode !== 422 && statusCode !== 403 && statusCode !== 409) {
      this.notify.error(this.l10n.t('An unexpected error has occurred.'), {
        closeAfter : 5000,
        id         : 'serve_error'
      });
    }
  },

  query(store, type, query) {
    query = fixFilterQuery(query);
    return this._super(store, type, query);
  },

  queryRecord(store, type, query) {
    query = fixFilterQuery(query);
    return this._super(store, type, query);
  },

  ajaxOptions(url, type) {
    const request = this._super(...arguments);

    // The requests with public=true will not be authorized
    if (type === 'GET') {
      if (request.data.public) {delete request.headers[ENV['ember-simple-auth-token'].authorizationHeaderName]}

      if (ENV.noCache === 'true') {
        request.data.nocache = true;
      }
    }

    return request;
  },

  /**
   This method is called for every response that the adapter receives from the
   API. If the response has a 401 status code it invalidates the session (see
   {{#crossLink "SessionService/invalidate:method"}}{{/crossLink}}).

   @method handleResponse
   @param {Number} status The response status as received from the API
   @param  {Object} headers HTTP headers as received from the API
   @param {any} payload The response body as received from the API
   @param {Object} requestData the original request information
   @protected
   */
  handleResponse(status, headers, payload, requestData) {
    this.ensureResponseAuthorized(status, headers, payload, requestData);
    return this._super(...arguments);
  },

  /**
   The default implementation for handleResponse.
   If the response has a 401 status code it invalidates the session (see
   {{#crossLink "SessionService/invalidate:method"}}{{/crossLink}}).

   Override this method if you want custom invalidation logic for incoming responses.
   @method ensureResponseAuthorized
   @param {Number} status The response status as received from the API
   */
  ensureResponseAuthorized(status) {
    if (status === 401 && this.session.isAuthenticated) {
      this.session.invalidate();
    }
  }
});
