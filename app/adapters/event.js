import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    let url = this._super(modelName, id, snapshot, requestType, query);
    if (requestType === 'updateRecord' && snapshot.adapterOptions && snapshot.adapterOptions.getTrashed) {
      url = `${url}?get_trashed=true`;
    }
    return url;
  }
});
