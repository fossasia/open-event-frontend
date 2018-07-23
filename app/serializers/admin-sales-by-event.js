import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    
    payload2 = this._super(...arguments);
    return payload2;
  },
  normalize(store, primaryModelClass, payload, id, requestType) {
      console.log("normalize")
    payload2 = this._super(...arguments);
    return payload2;
  },
});
