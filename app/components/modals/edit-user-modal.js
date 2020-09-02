import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class EditUserModal extends ModalBase {
  @action
  saveRole(id) {
    this.store.findRecord('user', id).then(function(user) {
      user.save();
    });
    this.set('isOpen', false);
  }

  @action
  toggleSalesAdmin(user) {
    user.toggleProperty('isSalesAdmin');
  }

  @action
  toggleMarketer(user) {
    user.toggleProperty('isMarketer');
  }

  @action
  createAdmin(user, isAdmin) {
    user.set('isAdmin', isAdmin);
  }
}

