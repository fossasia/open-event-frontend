import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('l10n').t('Notifications');
  },
  model() {
    let filterOptions = [
      {
        name : 'is-read',
        op   : 'eq',
        val  : false
      }
    ];
    return this.get('authManager.currentUser').query('notifications', {
      include : 'actions',
      filter  : filterOptions
    });
  }
});
