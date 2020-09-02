import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';

@classic
export default class DangerZone extends Component {
  @computed('data.events', 'data.orders')
  get isUserDeletable() {
    if (this.data.events.length || this.data.orders.length) {
      return false;
    }
    return true;
  }

  @action
  openDeleteUserModal(id, email) {
    this.setProperties({
      'isUserDeleteModalOpen' : true,
      'confirmEmail'          : '',
      'userEmail'             : email,
      'userId'                : id
    });
  }

  @action
  openConfirmDeleteUserModal() {
    this.setProperties({
      'isUserDeleteModalOpen'        : false,
      'confirmEmail'                 : '',
      'isConfirmUserDeleteModalOpen' : true,
      'checked'                      : false
    });
  }

  @action
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
