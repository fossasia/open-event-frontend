import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class extends Controller {

  @service errorHandler;

  @action
  openAddUserRoleModal() {
    const currentInvite = this.model.group.roles.createRecord({});
    this.set('currentInvite', currentInvite);
    this.set('isAddUserRoleModalOpen', true);
  }

  @action
  addUserRoles() {
    this.set('isLoading', true);
    this.currentInvite.save()
      .then(() => {
        this.set('isAddUserRoleModalOpen', false);
        this.notify.success(this.isNewInvite ? this.l10n.t('Role Invite sent successfully') : this.l10n.t('Role Invite updated successfully'), {
          id: 'man_role'
        });
      })
      .catch(e => {
        console.error('Error while updating role invite', e);
        this.errorHandler.handle(e);
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
