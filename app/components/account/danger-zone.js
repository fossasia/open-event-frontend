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
          this.authManager.logout();
          this.routing.transitionTo('index');
          this.notify.success(this.l10n.t('Your account has been deleted successfully.'), {
            id: 'account_Delete'
          });
        })
        .catch(e => {
          console.error('Error while deleting account', e);
          this.notify.error(this.l10n.t('An unexpected error has occurred.'), {
            id: 'account_del_error'
          });
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
