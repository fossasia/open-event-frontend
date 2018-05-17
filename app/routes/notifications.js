import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('l10n').t('Notifications');
  },
  model() {
    return this.get('authManager.currentUser').get('notifications').filterBy('isRead', false);
  }
});
