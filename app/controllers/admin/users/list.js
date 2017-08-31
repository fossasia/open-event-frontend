import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
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
      propertyName     : 'last-accessed-at',
      title            : 'Last Accessed',
      template         : 'components/ui-table/cell/admin/users/cell-last-accessed-at',
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
      this.transitionToRoute('admin.users.user', id);
    },
    deleteUser(user) {
      this.set('isLoading', true);
      user.destroyRecord()
        .then(() => {
          this.notify.success(this.l10n.t('User has been deleted successfully.'));
        })
        .catch(()=> {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(()=>{
          this.set('isLoading', false);
        });
    }
  }
});
