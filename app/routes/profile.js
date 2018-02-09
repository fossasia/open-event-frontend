import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.l10n.t('Profile');
  },

  model() {
    return this.get('authManager.currentUser');
  },

  actions: {
    willTransition() {
      this.get('authManager.currentUser').rollbackAttributes();
    }
  }
});
