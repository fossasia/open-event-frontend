import Controller from '@ember/controller';
export default Controller.extend({
  actions: {
    async openAddSystemRoleModal(role) {
      let permissions = await this.get('model.panelPermissions');

      this.set('panelPermissions', permissions);
      if (role) {
        let roles = role.panelPermissions;

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
    },
    deleteSystemRole(role) {
      this.set('isLoading', true);
      role.destroyRecord()
        .then(() => {
          this.notify.success(this.l10n.t('System role has been deleted successfully.'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred. System role was not deleted.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    addSystemRole() {
      this.set('isLoading', true);
      let panels = this.panelPermissions;

      panels.forEach(panel => {
        if (panel.isChecked) {
          this.get('role.panelPermissions').addObject(panel);
        } else {
          this.get('role.panelPermissions').removeObject(panel);
        }
      });
      if (!this.get('role.panelPermissions').length) {
        this.notify.error(this.l10n.t('Please select atleast one panel.'));
        this.set('isLoading', false);
      } else {
        this.role.save()
          .then(() => {
            this.set('isAddSystemRoleModalOpen', false);
            this.notify.success(this.l10n.t('System role have been saved successfully.'));
          })
          .catch(() => {
            this.notify.error(this.l10n.t('An unexpected error has occurred. System role not saved.'));
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      }
    },
    updatePermissions() {
      this.set('isLoading', true);
      this.get('model.userPermissions').save()
        .then(() => {
          this.notify.success(this.l10n.t('User permissions have been saved successfully.'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred. User permissions not saved.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
