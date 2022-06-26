import ApplicationAdapter from './application';
import ENV from 'open-event-frontend/config/environment';

export default ApplicationAdapter.extend({

  urlForQueryRecord(query) {
    return (query && query.code && query.eventIdentifier) ?
       `${ENV.APP.apiHost}/v1/events/${query.eventIdentifier}/discount-codes/${query.code}`
    : this._super(...arguments); 
  }
});
