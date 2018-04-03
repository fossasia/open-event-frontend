import { inject as service } from '@ember/service';
import ENV from 'open-event-frontend/config/environment';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import RESTAdapterMixin from 'ember-data-has-many-query/mixins/rest-adapter';

/**
 * The backend server expects the filter in a serialized string format.
 *
 * @param query
 * @return {*}
 */
export const fixFilterQuery = query  => {
  if (query.hasOwnProperty('filter')) {
    query.filter = JSON.stringify(query.filter);
  }
  return query;
};

export default JSONAPIAdapter.extend(DataAdapterMixin, RESTAdapterMixin, {
  host       : ENV.APP.apiHost,
  namespace  : ENV.APP.apiNamespace,
  authorizer : 'authorizer:token',

  notify: service(),

  isInvalid(statusCode) {
    if (statusCode !== 404 && statusCode !== 422) {
      this.get('notify').error('An unexpected error occurred.', {
        closeAfter: 5000
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
  }
});
