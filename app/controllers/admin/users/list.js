import Controller from '@ember/controller';
import { action } from '@ember/object';
import { or } from '@ember/object/computed';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';


export default class extends Controller.extend(EmberTableControllerMixin) {
  sort_by = 'created-at';

  sort_dir = 'DSC';

  @or('authManager.currentUser.isSuperAdmin', 'authManager.currentUser.isAdmin') hasRestorePrivileges;

  get columns() {
    return [
      {
        name            : this.l10n.t('Name'),
        valuePath       : 'firstName',
        extraValuePaths : ['fullName', 'deletedAt', 'id', 'isSuperAdmin'],
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
        name            : this.l10n.t('Email'),
        valuePath       : 'email',
        width           : 175,
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name          : this.l10n.t('Status'),
        valuePath     : 'status',
        cellComponent : 'ui-table/cell/admin/users/cell-status'
      },
      {
        name            : this.l10n.t('System Roles'),
        valuePath       : 'isSuperAdmin',
        extraValuePaths : ['isAdmin', 'isVerified'],
        cellComponent   : 'ui-table/cell/admin/users/cell-system-roles'
      },
      {
        name            : this.l10n.t('Event Roles'),
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
        name          : this.l10n.t('User Links'),
        valuePath     : 'id',
        cellComponent : 'ui-table/cell/admin/users/cell-user-links'
      },
      {
        name            : this.l10n.t('Member Since'),
        valuePath       : 'createdAt',
        cellComponent   : 'ui-table/cell/cell-simple-date',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name            : this.l10n.t('Last Accessed'),
        valuePath       : 'lastAccessedAt',
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/cell-simple-date'
      },
      {
        name            : this.l10n.t('Mark Spam'),
        valuePath       : 'id',
        extraValuePaths : ['isBlocked'],
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/admin/users/cell-mark-spam',
        actions         : {
          toggleSpam: this.toggleSpam.bind(this)
        }
      },
      {
        name            : this.l10n.t('Verified'),
        valuePath       : 'isVerified',
        extraValuePaths : ['id'],
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/admin/users/cell-user-verify',
        actions         : {
          toggleVerify: this.toggleVerify.bind(this)
        }
      }
    ];
  }

  @action
  moveToUserDetails(id) {
    this.transitionToRoute('admin.users.view', id);
  }

  @action
  async toggleSpam(user_id) {
    this.set('isLoading', true);
    try {
      const user = this.store.peekRecord('user', user_id, { backgroundReload: false });
      user.toggleProperty('isBlocked');
      await user.save();
      this.notify.success(user.isBlocked ? this.l10n.t('User has been marked as Spam successfully.') : this.l10n.t('User has been marked as Not Spam successfully.'),
        {
          id: 'user_spam_succ'
        });

    } catch (e) {
      console.error('Error while marking user as spam', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'user_spam_error'
        });
    }

    this.set('isLoading', false);
  }

  @action
  async toggleVerify(user_id) {
    this.set('isLoading', true);
    try {
      const user = this.store.peekRecord('user', user_id, { backgroundReload: false });
      user.toggleProperty('isVerified');
      await user.save();
      this.notify.success(this.l10n.t('User verifiation state changed successfully.'),
        {
          id: 'user_verf_succ'
        });

    } catch (e) {
      console.error('Error while verifying user', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'user_verf_error'
        });
    }

    this.set('isLoading', false);
  }

  @action
  async deleteUser(user_id) {
    this.set('isLoading', true);
    try {
      const user = this.store.peekRecord('user', user_id, { backgroundReload: false });
      await user.destroyRecord();
      this.notify.success(this.l10n.t('User has been deleted successfully.'),
        {
          id: 'user_delete_succ'
        });

    } catch (e) {
      console.error('Error while deleting user', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'user_delete_error'
        });
    }

    this.set('isLoading', false);
  }

  @action
  openEditModal(user_id) {
    const user = this.store.peekRecord('user', user_id, { backgroundReload: false });
    this.setProperties({
      isEditUserModalOpen : true,
      data                : user
    });
  }

  @action
  async restoreUser(user_id) {
    this.set('isLoading', true);
    try {
      const user = this.store.peekRecord('user', user_id, { backgroundReload: false });
      user.set('deletedAt', null);
      user.save({ adapterOptions: { getTrashed: true } });
      this.notify.success(this.l10n.t('User has been restored successfully.'),
        {
          id: 'user_restore'
        });
    } catch (e) {
      console.error('Error while restoring user', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'user_restore_error'
        });
      console.warn(e);
    }

    this.set('isLoading', false);
  }
}
