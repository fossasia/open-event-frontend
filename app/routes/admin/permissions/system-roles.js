import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  titleToken() {
    return this.l10n.t('System Roles');
  },
  model() {
    return RSVP.hash({
      userPermissions : this.get('store').findAll('user-permission'),
      roles           : this.get('store').findAll('role')
    });
  },
  actions: {
    willTransition() {
      this.get('controller.model.userPermissions').forEach(userPermission => {
        userPermission.rollbackAttributes();
      });
    }
  }
});
