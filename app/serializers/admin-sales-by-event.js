import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    console.log(store, primaryModelClass, payload, id, requestType); /* eslint-disable-line no-console */
    var payload2 = this._super(...arguments);
    return payload2;
  },
  normalize(store, primaryModelClass, payload, id, requestType) {
    console.log('normalize');/* eslint-disable-line no-console */
    console.log(store, primaryModelClass, payload, id, requestType);/* eslint-disable-line no-console */
    var payload2 = this._super(...arguments);
    return payload2;
  }
});
