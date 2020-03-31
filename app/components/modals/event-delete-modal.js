import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class EventDeleteModal extends ModalBase {
  isSmall = true;
  confirmName = '';

  @computed('confirmName')
  get isNameDifferent() {
    return this.eventName ? this.confirmName !== this.eventName : true;
  }
}
