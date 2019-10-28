import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import { or } from '@ember/object/computed';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';


export default class extends Controller.extend(EmberTableControllerMixin) {
  @or('authManager.currentUser.isSuperAdmin', 'authManager.currentUser.isAdmin') hasRestorePrivileges;

  @computed()
  get columns() {
    return [
      {
        name            : 'Name',
        valuePath       : 'firstName',
        extraValuePaths : ['deletedAt', 'id', 'isSuperAdmin'],
        cellComponent   : 'ui-table/cell/admin/users/cell-first-name',
        width           : 155,
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        options         : {
          hasRestorePrivileges: this.hasRestorePrivileges
        },
        actions: {
          moveToUserDetails : this.moveToUserDetails.bind(this),
          deleteUser        : this.deleteUser.bind(this),
          openEditModal     : this.openEditModal.bind(this),
          restoreUser       : this.restoreUser.bind(this)
        }
      },
      {
        name            : 'Email',
        valuePath       : 'email',
        width           : 175,
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name          : 'Status',
        valuePath     : 'status',
        cellComponent : 'ui-table/cell/admin/users/cell-status'
      },
      {
        name            : 'System Roles',
        valuePath       : 'isSuperAdmin',
        extraValuePaths : ['isAdmin', 'isVerified'],
        cellComponent   : 'ui-table/cell/admin/users/cell-system-roles'
      },
      {
        name            : 'Event Roles',
        valuePath       : 'isSuperAdmin',
        width           : 260,
        extraValuePaths : ['isAdmin', 'isUserOwner', 'ownerEvents',
          'isUserOrganizer', 'organizerEvents', 'isUserCoorganizer', 'coorganizerEvents',
          'isUserTrackOrganizer', 'trackOrganizerEvents', 'isUserRegistrar', 'registrarEvents',
          'isUserModerator', 'moderatorEvents', 'isMarketer', 'marketerEvents', 'isSalesAdmin',
          'salesAdminEvents'],
        cellComponent: 'ui-table/cell/admin/users/cell-event-roles'
      },
      {
        name          : 'User Links',
        valuePath     : 'id',
        cellComponent : 'ui-table/cell/admin/users/cell-user-links'
      },
      {
        name            : 'Member Since',
        valuePath       : 'createdAt',
        cellComponent   : 'ui-table/cell/admin/users/cell-created-at',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name            : 'Last Accessed',
        valuePath       : 'lastAccessedAt',
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/cell-simple-date',
        options         : {
          dateFormat: 'MMMM DD, YYYY - hh:mm A'
        }
      }
    ];
  }

  @action
  moveToUserDetails(id) {
    this.transitionToRoute('admin.users.view', id);
  }

  @action
  async deleteUser(user_id) {
    this.set('isLoading', true);
    try {
      let user = this.store.peekRecord('user', user_id, { backgroundReload: false });
      await user.destroyRecord();
      this.notify.success(this.l10n.t('User has been deleted successfully.'));

    } catch (e) {
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
    }

    this.set('isLoading', false);
  }

  @action
  openEditModal(user_id) {
    let user = this.store.peekRecord('user', user_id, { backgroundReload: false });
    this.setProperties({
      isEditUserModalOpen : true,
      data                : user
    });
  }

  @action
  async restoreUser(user_id) {
    this.set('isLoading', true);
    try {
      let user = this.store.peekRecord('user', user_id, { backgroundReload: false });
      user.set('deletedAt', null);
      user.save({ adapterOptions: { getTrashed: true } });
      this.notify.success(this.l10n.t('User has been restored successfully.'));
    } catch (e) {
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
      console.warn(e);
    }

    this.set('isLoading', false);
  }
}
