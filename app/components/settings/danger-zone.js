import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  isUserDeletable: computed('data.events', 'data.orders', function() {
    if (this.get('data.events').length || this.get('data.orders').length) {
      return false;
    }
    return true;
  }),

  actions: {
    openDeleteUserModal(id, email) {
      this.setProperties({
        'isUserDeleteModalOpen' : true,
        'confirmEmail'          : '',
        'userEmail'             : email,
        'userId'                : id
      });
    },
    openConfirmDeleteUserModal() {
      this.setProperties({
        'isUserDeleteModalOpen'        : false,
        'confirmEmail'                 : '',
        'isConfirmUserDeleteModalOpen' : true,
        'checked'                      : false
      });
    },
    deleteUser(user) {
      this.set('isLoading', true);
      user.destroyRecord()
        .then(() => {
          this.get('authManager').logout();
          this.get('routing').transitionTo('index');
          this.notify.success(this.get('l10n').t('Your account has been deleted successfully.'));
        })
        .catch(() => {
          this.notify.error(this.get('l10n').t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.setProperties({
            'isLoading'                    : false,
            'isConfirmUserDeleteModalOpen' : false,
            'checked'                      : false
          });
        });
    }
  }
});
