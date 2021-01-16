import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class SimpleModal extends ModalBase {
  @action
  performAction() {
    this.close();
    this.action();
  }

  @action
  performCancel() {
    this.close();
    this.cancel?.();
  }
}
