import ENV from 'open-event-frontend/config/environment';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import Ember from 'ember';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { inject: { service } } = Ember;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host       : ENV.APP.apiHost,
  namespace  : ENV.APP.apiNamespace,
  authorizer : 'authorizer:token',

  notify: service(),

  isInvalid(statusCode) {
    if (statusCode !== 404) {
      this.get('notify').error('An unexpected error occurred.', {
        closeAfter: 5000
      });
    }
  },

  /**
   * The backend server expects the filter in a serialized string format.
   *
   * @param query
   * @return {*}
   */
  fixFilterQuery(query) {
    if (query.hasOwnProperty('filter')) {
      query.filter = JSON.stringify(query.filter);
    }
    return query;
  },

  query(store, type, query) {
    query = this.fixFilterQuery(query);
    return this._super(store, type, query);
  },

  queryRecord(store, type, query) {
    query = this.fixFilterQuery(query);
    return this._super(store, type, query);
  }
});
