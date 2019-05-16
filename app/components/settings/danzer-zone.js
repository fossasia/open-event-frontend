import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  doesUserHaveEventsOrOrders: computed('data.events', 'data.orders', function() {
    if (this.get('data.events').length || this.get('data.orders').length) {
      return true;
    }
    return false;
  }),

  actions: {
    openDeleteUserModal(id, email) {
      this.set('isUserDeleteModalOpen', true);
      this.set('confirmEmail', '');
      this.set('userEmail', email);
      this.set('userId', id);
    },
    openConfirmDeleteUserModal() {
      this.set('isUserDeleteModalOpen', false);
      this.set('confirmEmail', '');
      this.set('isConfirmUserDeleteModalOpen', true);
      this.set('checked', false);
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
          this.set('isLoading', false);
          this.set('checked', false);
          this.set('isConfirmUserDeleteModalOpen', false);
        });
    }
  }
});
