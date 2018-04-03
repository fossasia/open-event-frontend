import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.l10n.t('Sessions');
  },
  model(params) {
    return this.store.findRecord('session', params.session_id, {
      include: 'session-type,speakers,track'
    });
  }
});
