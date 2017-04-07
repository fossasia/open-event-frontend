import ENV from 'open-event-frontend/config/environment';
import DS from 'ember-data';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend({
  host       : ENV.APP.apiHost,
  namespace  : ENV.APP.apiNamespace,
  authorizer : 'authorizer:oauth2'
});
