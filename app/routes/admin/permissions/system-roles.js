import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('System Roles');
  },
  async model() {
    return {
      userPermissions  : await this.store.findAll('user-permission'),
      systemRoles      : await this.store.findAll('custom-system-role'),
      panelPermissions : await this.store.findAll('panel-permission')
    };
  },
  actions: {
    willTransition() {
      this.controller.model.userPermissions.forEach(userPermission => {
        userPermission.rollbackAttributes();
      });
    }
  }
});
