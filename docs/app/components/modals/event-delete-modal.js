import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class EventDeleteModal extends ModalBase {
  isSmall = true;
  @tracked confirmName = '';

  get isNameDifferent() {
    return this.confirmName?.trim() !== this.eventName?.trim();
  }
}
