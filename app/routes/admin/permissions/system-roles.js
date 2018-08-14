import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('System Roles');
  },
  async model() {
    return {
      userPermissions  : await this.get('store').findAll('user-permission'),
      systemRoles      : await this.get('store').findAll('custom-system-role'),
      panelPermissions : await this.get('store').findAll('panel-permission')
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
