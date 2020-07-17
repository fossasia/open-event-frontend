import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class UserDeleteModal extends ModalBase {
  isSmall = true;
  @tracked confirmEmail = '';

  get isEmailDifferent() {
    return this.confirmEmail !== this.userEmail;
  }
}
