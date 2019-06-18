import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.l10n.t('Email Preferences');
  },
  model() {
    const currentUser = this.modelFor('admin.users.view');
    return currentUser.query('emailNotifications', { include: 'event' });
  }
});
