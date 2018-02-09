import Ember from 'ember';

const { Route, RSVP } = Ember;

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
