import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class EventTransferModal extends ModalBase {
  isSmall = true;
  confirmEventName = '';

  @computed('confirmEventName', 'eventName')
  get isNameDifferent() {
    return this.eventName ? this.confirmEventName !== this.eventName : true;
  }
}
