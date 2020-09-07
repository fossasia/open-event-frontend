import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    const url = this._super(modelName, id, snapshot, requestType, query);
    if (requestType === 'updateRecord' && snapshot.adapterOptions?.getTrashed) {
      return url + '?get_trashed=true';
    }
    if (query?.upcoming) {
      return url + '/upcoming';
    }
    return url;
  }
});
