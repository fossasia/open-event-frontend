import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class UserDeleteModal extends ModalBase {
  isSmall = true;
  confirmEmail = '';

  @computed('confirmEmail')
  get isEmailDifferent() {
    return this.userEmail ? this.confirmEmail !== this.userEmail : true;
  }
}
