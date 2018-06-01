import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    switch (this.get('params.session_status')) {
      case 'upcoming':
        return this.get('l10n').t('Upcoming');
      case 'past':
        return this.get('l10n').t('Past');
    }
  },
  model() {
    const userDetails = this.modelFor('admin.users.view');
    return this.store.findRecord('user', userDetails.id, {
      include: 'sessions'
    });
  }
});
