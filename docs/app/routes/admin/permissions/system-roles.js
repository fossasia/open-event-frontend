import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class SystemRolesRoute extends Route {
  titleToken() {
    return this.l10n.t('System Roles');
  }

  async model() {
    return hash({
      userPermissions  : this.store.findAll('user-permission'),
      systemRoles      : this.store.findAll('custom-system-role'),
      panelPermissions : this.store.findAll('panel-permission')
    });
  }

  @action
  willTransition() {
    this.controller.model.userPermissions.forEach(userPermission => {
      userPermission.rollbackAttributes();
    });
  }
}
