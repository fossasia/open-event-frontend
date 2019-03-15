import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  hasRestorePrivileges: computed('authManager.currentUser.isAdmin', function() {
    return this.get('authManager.currentUser.isSuperAdmin') || this.get('authManager.currentUser.isAdmin');
  }),
  columns: [
    {
      propertyName     : 'first-name',
      title            : 'Name',
      template         : 'components/ui-table/cell/admin/users/cell-first-name',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      propertyName     : 'email',
      title            : 'Email',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      propertyName     : 'status',
      title            : 'Status',
      template         : 'components/ui-table/cell/admin/users/cell-status',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      propertyName     : 'system-roles',
      title            : 'System Roles',
      template         : 'components/ui-table/cell/admin/users/cell-system-roles',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      propertyName     : 'event-roles',
      title            : 'Event Roles',
      template         : 'components/ui-table/cell/admin/users/cell-event-roles',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      propertyName     : 'user-links',
      title            : 'User Links',
      template         : 'components/ui-table/cell/admin/users/cell-user-links',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      propertyName : 'created-at',
      title        : 'Member Since',
      template     : 'components/ui-table/cell/admin/users/cell-created-at'
    },
    {
      propertyName     : 'lastAccessedAt',
      title            : 'Last Accessed',
      template         : 'components/ui-table/cell/cell-simple-date',
      dateFormat       : 'MMMM DD, YYYY - hh:mm A',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      template         : 'components/ui-table/cell/admin/users/cell-actions',
      title            : 'Actions',
      disableSorting   : true,
      disableFiltering : true
    }
  ],
  actions: {
    moveToUserDetails(id) {
      this.transitionToRoute('admin.users.view', id);
    },
    deleteUser(user) {
      this.set('isLoading', true);
      user.destroyRecord()
        .then(() => {
          this.notify.success(this.get('l10n').t('User has been deleted successfully.'));
        })
        .catch(() => {
          this.notify.error(this.get('l10n').t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    openEditModal(user) {
      this.set('isEditUserModalOpen', true);
      this.set('data', user);
    },
    restoreUser(user) {
      this.set('isLoading', true);
      user.set('deletedAt', null);
      user.save({ adapterOptions: { getTrashed: true } })
        .then(() => {
          this.notify.success(this.get('l10n').t('User has been restored successfully.'));
          this.send('refreshRoute');
        })
        .catch(e => {
          this.notify.error(this.get('l10n').t('An unexpected error has occurred.'));
          console.warn(e);
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
