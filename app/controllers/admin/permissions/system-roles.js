import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  async openAddSystemRoleModal(role) {
    const permissions = await this.model.panelPermissions;
    this.set('panelPermissions', permissions);
    if (role) {
      const roles = role.panelPermissions;
      permissions.forEach(permission => {
        if (roles.includes(permission)) {
          permission.set('isChecked', true);
        } else {
          permission.set('isChecked', false);
        }
      });
      this.set('role', role);
      this.set('isNew', false);
    } else {
      this.set('role', this.store.createRecord('custom-system-role'));
      permissions.forEach(permission => {
        permission.set('isChecked', false);
      });
      this.set('isNew', true);
    }
    this.set('isAddSystemRoleModalOpen', true);
  }

  @action
  deleteSystemRole(role) {
    this.set('isLoading', true);
    role.destroyRecord()
      .then(() => {
        this.notify.success(this.l10n.t('System role has been deleted successfully.'),
          {
            id: 'system_role_update'
          });
      })
      .catch(e => {
        console.error('Error while deleting system role', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred. System role was not deleted.'),
          {
            id: 'system_role_error'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  addSystemRole() {
    this.set('isLoading', true);
    const panels = this.panelPermissions;
    panels.forEach(panel => {
      if (panel.isChecked) {
        this.role.panelPermissions.addObject(panel);
      } else {
        this.role.panelPermissions.removeObject(panel);
      }
    });
    if (!this.role.panelPermissions.length) {
      this.notify.error(this.l10n.t('Please select atleast one panel.'),
        {
          id: 'select_panel'
        });
      this.set('isLoading', false);
    } else {
      this.role.save()
        .then(() => {
          this.set('isAddSystemRoleModalOpen', false);
          this.notify.success(this.l10n.t('System role have been saved successfully.'),
            {
              id: 'system_role_save'
            });
        })
        .catch(e => {
          console.error('Error while saving system role', e);
          this.notify.error(this.l10n.t('An unexpected error has occurred. System role not saved.'),
            {
              id: 'system_save_role_error'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }

  @action
  updatePermissions() {
    this.set('isLoading', true);
    this.model.userPermissions.save()
      .then(() => {
        this.notify.success(this.l10n.t('User permissions have been saved successfully.'),
          {
            id: 'user_permission_save'
          });
      })
      .catch(e => {
        console.error('Error while saving user permissions', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred. User permissions not saved.'),
          {
            id: 'user_error_permission'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
