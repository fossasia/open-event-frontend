import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class LoginSignupModal extends ModalBase {
  reduceWidth = true;

  @action
  toggleView() {
    this.set('isOpen', false);
  }
}
