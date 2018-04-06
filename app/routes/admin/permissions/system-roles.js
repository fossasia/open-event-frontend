import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('System Roles');
  },
  async model() {
    return {
      userPermissions : await this.get('store').findAll('user-permission'),
      roles           : await this.get('store').findAll('role')
    };
  },
  actions: {
    willTransition() {
      this.get('controller.model.userPermissions').forEach(userPermission => {
        userPermission.rollbackAttributes();
      });
    }
  }
});
