import ENV from 'open-event-frontend/config/environment';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host       : ENV.APP.apiHost,
  namespace  : ENV.APP.apiNamespace,
  authorizer : 'authorizer:token'
});
