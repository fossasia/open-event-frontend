import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';

@classic
export default class SystemRolesRoute extends Route {
  titleToken() {
    return this.l10n.t('System Roles');
  }

  async model() {
    return {
      userPermissions  : await this.store.findAll('user-permission'),
      systemRoles      : await this.store.findAll('custom-system-role'),
      panelPermissions : await this.store.findAll('panel-permission')
    };
  }

  @action
  willTransition() {
    this.controller.model.userPermissions.forEach(userPermission => {
      userPermission.rollbackAttributes();
    });
  }
}
