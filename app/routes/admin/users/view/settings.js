import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.l10n.t('Settings');
  },
  model() {
    const currentUser = this.modelFor('admin.users.view');
    return {
      user: currentUser
    };
  }
});
