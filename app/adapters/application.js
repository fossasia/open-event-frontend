import ENV from 'open-event-frontend/config/environment';
import DS from 'ember-data';
import Ember from 'ember';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { JSONAPIAdapter } = DS;
const { inject: { service } } = Ember;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host       : ENV.APP.apiHost,
  namespace  : ENV.APP.apiNamespace,
  authorizer : 'authorizer:token',

  notify: service(),


  isInvalid() {
    this.get('notify').error('An unexpected error occurred. Please try again later.', {
      closeAfter: 5000
    });
  }
});
