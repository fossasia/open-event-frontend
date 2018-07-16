import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    switch (this.get('params.event_status')) {
      case 'live':
        return this.get('l10n').t('Live');
      case 'draft':
        return this.get('l10n').t('Draft');
      case 'past':
        return this.get('l10n').t('Past');
    }
  },
  model() {
    const userDetails = this.modelFor('admin.users.view');
    return this.store.findRecord('user', userDetails.id, {
      include: 'events, sessions, speakers'
    });
  }
});
